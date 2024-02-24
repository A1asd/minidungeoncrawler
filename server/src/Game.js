const PlayerGroup = require("./PlayerGroup");
const WorldFactory = require("./factories/WorldFactory");

class Game {
	users = {};
	groups = {};
	channels = {};
	worlds = {};

	subscribeToChannel(connection, channel) {
		if (this.channels[channel]) this.channels[channel].push(connection);
		else this.channels[channel] = [connection];
	}

	unsubscribeFromChannel(connection, channel) {

	}

	switchChannel(connection, newChannel, oldChannel) {

	}

	addWorld(id, world) {
		this.worlds[id] = world;
	}

	createWorld(map, spawn) {
		let world = WorldFactory.createWorld(map, spawn);
		this.worlds[world.id] = world;
		return world;
	}

	createGroup() {
		let group = PlayerGroup.createGroup();
		this.groups[group.id] = group;
		return group;
	}
}

let gameWorld = new Game();

module.exports = gameWorld;
