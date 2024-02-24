const gameWorld = require("./Game");

class Updater {
	constructor(connection) {
		this.connection = connection;
	}

	updateMap(world, player) {
		this.connection.send(JSON.stringify({
			action:'drawMap',
			data: {
				tiles: world.getVisibleTilesFromLocation(player.position),
				configId: world.map.assetConfigId
			}
		}));
		return this;
	}

	updateArea(world, player, eventClass) {
		let eventKeys = world.map.atPosition(player.position).getEvents();
		let events = eventKeys.map(e => new eventClass(e));
		let eligableEvents = events.filter(ev => ev.meetsRequirements(player));
		eligableEvents.forEach(elev => {
			elev.actions = elev.getActions().filter(evAction => evAction.meetsRequirements(player));
		});
		this.connection.send(JSON.stringify({
			action:'updateArea',
			data: {
				description: world.map.atPosition(player.position).getDescription(),
				events: eligableEvents,
			}
		}));
		return this;
	}

	updateLocation(world, player) {
		world.map.atPosition(player.position).pcs.map(player => {
			let connection = gameWorld.users[player.id];
			connection.send(JSON.stringify({
				action:'updateLocation',
				data: world.map.atPosition(player.position).getAllEntities(player.id)
			}));
		})
		return this;
	}

	updatePlayer(player) {
		this.connection.send(JSON.stringify({
			action:'updatePlayer',
			data: {player: player}
		}));
		return this;
	}

	updateGroup(group) {
		this.connection.send(JSON.stringify({
			action:'updateGroup',
			data: {group: group}
		}));
		return this;
	}

	sendChatMessage(user, message, channel) {
		this.connection.send(JSON.stringify({
			action:'recieveMessage',
			data: {
				user: user,
				message: message,
				channel: channel
			}
		}));
		return this;
	}
}

module.exports = Updater;
