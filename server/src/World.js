const Map = require("./Map");
const Position = require("./Position");

class World {
	map;
	players = {};
	npcs = {};
	objects = {};
	spawnPosition;

	/**
	 * @param {Map} map
	 * @param {Position} spawnPosition
	 */
	constructor(map, spawnPosition) {
		this.map = map;
		this.spawnPosition = spawnPosition;
	}

	spawnNPC(npc) {
		this.map.atPosition(npc.position).pushNPC(npc);
		this.npcs[npc.id] = npc;
	}

	spawnItem(item, position) {
		this.map.atPosition(position).pushItem(item);
		this.objects[item.id] = item;
	}

	despawnItem(item) {
		delete this.objects[item.id];
	}

	killNPC(npc) {
		this.map.atPosition(npc.position).removeNPC(npc);
		//spawn reward
		npc.rewards.forEach(item => {
			this.spawnItem(item, npc.position);
		});
		delete this.npcs[npc.id];
	}

	spawnPlayer(player) {
		if (!player.position) player.position = this.spawnPosition;
		this.map.atPosition(player.position).pushPC(player);//pushPlayerAtPosition(player, player.position);
		this.players[player.id] = player;
	}

	movePlayer(playerId, vector) {
		let player = this.players[playerId];
		if (this.map.atPosition(player.position.addVector(vector)).getCollision()) this.transportPlayer(player, player.position.addVector(vector));
	}

	transportPlayer(player, position) {
		if (this.map.atPosition(position).getCollision()) {
			this.map.atPosition(player.position).removePlayer(player);
			this.map.atPosition(position).pushPC(player);//pushPlayerAtPosition(player, position);
			player.setPosition(new Position(position.x, position.y));
		}
	}

	getVisibleTilesFromLocation(position) {
		let visibleTiles = [];
		let row;
		for (let y = -2; y < 3; y++) {
			row = [];
			for (let x = -2; x < 3; x++) {
				row.push(this.map.getTile(position.addVector({x: x, y: y})));
			}
			visibleTiles.push(row);
		}
		return visibleTiles;
	}

	getPlayer(id) {
		return this.players[id];
	}

	getEnemy(id) {
		return this.npcs[id];
	}

	getItem(id) {
		return this.objects[id];
	}
}

module.exports = World;
