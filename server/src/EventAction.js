const ItemRequirement = require("./ItemRequirement");
const Updater = require("./Updater");

class EventAction {
	constructor(id, label, requirement) {
		this.id = id;
		this.label = label;
		if (requirement) this.requirement = new ItemRequirement(requirement.operator, requirement.value);
	}

	static healing_fountain_drink(player, _world, connection) {
		player.hp = player.maxHp;
		let updater = new Updater(connection);
		updater
			.updatePlayer(player);
	}

	static healing_fountain_destroy(player, world, connection, data, Event) {
		player.removeFromInventory('hammer');
		world.map.atPosition(player.position).description = "Hier stand einst ein Heilbrunnen";
		world.map.atPosition(player.position).events = [];
		let updater = new Updater(connection);
		updater
			.updatePlayer(player)
			.updateArea(world, player, Event)
			.sendChatMessage(connection.id, '\'s Hammer zerspringt beim zerschlagen des Brunnens', data.channel)
			.sendChatMessage('system', 'Die Monster des Dungeons reagieren auf deine Aktionen', data.channel);
	}

	static door_1_action_open(player, world, connection, data, Event) {
		let lastPosition = player.getPosition();
		world.transportPlayer(player, {x: 3, y: 8});
		let hasMoved = lastPosition !== player.getPosition();
		if (hasMoved) {
			let updater = new Updater(connection);
			updater
				.updateMap(world, player)
				.updateArea(world, player, Event)
				.updateLocation(world, player)
				.sendChatMessage(connection.id, 'just moved', data.channel);
		}
	}

	static door_2_action_open() {}

	static select_dungeon_1() {}

	static start_selected_dungeon() {}

	meetsRequirements(player) {
		if (!this.requirement) return true;
		return this.requirement.meetsRequirement(player);
	}
}

module.exports = EventAction;
