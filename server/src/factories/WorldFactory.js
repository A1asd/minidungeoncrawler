const World = require("../World");

class WorldFactory {
	static createWorld(map, spawn) {
		return new World(map, spawn);
	}
}

module.exports = WorldFactory;
