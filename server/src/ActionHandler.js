const Authenticator = require("./Authenticator");
const Enemy = require("./Enemy");
const Event = require("./Event");
const EventAction = require("./EventAction");
const gameWorld = require("./Game");
const Item = require("./Item");
const Player = require("./Player");
const Position = require("./Position");
const Updater = require("./Updater");

class ActionHandler {
	gameWorld; world;

	constructor(world) {
		this.gameWorld = gameWorld;
		this.world = world;
	}

	handleMoveAction(connection, data) {
		let player = this.world.getPlayer(connection.id);
		let lastPosition = player.getPosition();
		this.world.movePlayer(connection.id, {x: data.x, y: data.y});
		let hasMoved = lastPosition !== player.getPosition();
		if (hasMoved) {
			let updater = new Updater(connection);
			updater
				.updateMap(this.world, player)
				.updateArea(this.world, player, Event)
				.updateLocation(this.world, player)
				.sendChatMessage(connection.id, 'just moved', data.channel);
		}
		//console.log(connection.id + ' -> move -> from: ' + lastPosition + ' to: ' + player.getPosition());
	}

	handleLoginAction(connection, data) {
		let user = data.user;
		let password = data.password;
		if (Authenticator.authenticate(user, password)) {
			this.gameWorld.users[user] = connection;
			connection.id = user;
			this.gameWorld.subscribeToChannel(connection, 'all')
			connection.send(JSON.stringify({action: 'loginSuccess'}));
			let player;
			if (!(player = this.world.getPlayer(user))) {
				player = new Player(user);
				this.world.spawnPlayer(player);
			}
			let updater = new Updater(connection);
			updater
				.updateMap(this.world, player)
				.updatePlayer(player)
				.updateArea(this.world, player, Event)
				.updateLocation(this.world, player)
				.sendChatMessage('system', 'you joined all channel', 'private');
			return true;
		} else {
			console.log('user ' + user + ' does not exist or password does not match');
		}
		return false;
	}

	handleAttackAction(connection, data) {
		let enemy = this.world.getEnemy(data.id);
		let player = this.world.getPlayer(connection.id);
		let updater = new Updater(connection);
		enemy.hp = enemy.hp - Math.floor(player.statBag.getStrength().value / 2);
		if (enemy.hp <= 0) {
			this.world.killNPC(enemy);
			updater.sendChatMessage(connection.id, 'just killed ' + enemy.id, data.channel);
			setTimeout(() => {
				let enemy = new Enemy('leere Hülle', new Position(4,3), [], 15, 2);
				this.world.spawnNPC(enemy);
				updater
					.updateLocation(this.world, player)
					.sendChatMessage('system', 'a new ' + enemy.id + ' arises', data.channel);
			}, 5000);
		}
		else {
			player.hp = player.hp - (enemy.attack - player.statBag.getDefiance().value);
			updater
				.sendChatMessage(connection.id, 'just striked ' + enemy.id + ' for ' + player.attack + ' damage', data.channel);
		}
		updater
			.updatePlayer(player)
			.updateLocation(this.world, player);
	}

	handlePickupAction(connection, data) {
		let item = this.world.getItem(data.id);
		let player = this.world.getPlayer(connection.id);
		let updater = new Updater(connection);
		this.world.map.atPosition(player.getPosition()).removeItem(item);
		player.addToInventory(item);
		updater
			.updateLocation(this.world, player)
			.updatePlayer(player);
	}

	handleTriggerEventAction(connection, data) {
		EventAction[data.eventId.id](this.world.getPlayer(connection.id), this.world, connection, data, Event);
	}

	handleChatAction(connection, data) {
		this.gameWorld.channels[data.channel].forEach((userConnection) => {
			userConnection.send(JSON.stringify({action:'recieveMessage', data: {user:connection.id, message:data.message, channel:data.channel}}));
		});
	}

	handleUseItemAction(connection, data) {
		let item = this.world.getItem(data.itemId);
		item.use(connection, this.world.getPlayer(connection.id));
	}

	handleEquipItemAction(connection, data) {
		let player = this.world.getPlayer(connection.id);
		let equipment = player.getItem(data.itemId);
		player.equip(equipment);
		let updater = new Updater(connection);
		updater
			.updatePlayer(player)
			.updateArea(this.world, player, Event);
	}

	handleUnequipItemAction(connection, data) {
		let player = this.world.getPlayer(connection.id);
		player.unequip(data.slot);
		let updater = new Updater(connection);
		updater
			.updatePlayer(player)
			.updateArea(this.world, player, Event);
	}

	handleDropItemAction(connection, data) {
		let player = this.world.getPlayer(connection.id);
		let item = player.inventory.filter(item => item.id === data.itemId)[0];
		player.removeFromInventory(item.ref);
		this.world.spawnItem(item, player.getPosition());
		let updater = new Updater(connection);
		updater
			.updatePlayer(player)
			.updateLocation(this.world, player);
	}

	handleSendInviteAction(connection, data) {
		let invitingPlayer = this.world.getPlayer(connection.id);
		if (invitingPlayer.group === null) {
			let group = this.gameWorld.createGroup();
			group.addPlayer(invitingPlayer);
			let updater = new Updater(connection);
			updater
				.updatePlayer(invitingPlayer)
				.updateGroup(group);
		}
		this.gameWorld.users[data.invitedPlayerId].send(JSON.stringify({ action:'recieveGroupInvite', data: { groupId: invitingPlayer.group, playerId: invitingPlayer.id } }));
	}

	handleAcceptInviteAction(connection, data) {
		//player.group.addPlayer(this.world.getPlayer(data.playerId));
		let invitedPlayer = this.world.getPlayer(connection.id)
		console.log(data);
		let group = this.gameWorld.groups[data.groupId];
		group.addPlayer(invitedPlayer);
		let updater = new Updater(connection);
		updater
			.updatePlayer(invitedPlayer);
		group.playerList.map(player => {
			let updater = new Updater(this.gameWorld.users[player.id]);
			updater
				.updateGroup(group);
		});
	}

	handleLeaveGroupAction(connection, data) {
		let player = this.world.getPlayer(connection.id);
		let group = this.gameWorld.groups[player.group];
		group.removePlayer(player);
		if (group.playerList <= 0) {
			delete this.gameWorld.groups[group.id];
			console.log(this.gameWorld.groups);
		}
		let personalUpdater = new Updater(connection);
		personalUpdater
			.updateGroup(null);
		group.playerList.map(player => {
			let updater = new Updater(this.gameWorld.users[player.id]);
			updater
				.updateGroup(group);
		});
	}
}

module.exports = ActionHandler;
