const Event = require('./Event');

class Tile {
	asset;
	collision;
	description;
	events = [];
	pcs = [];
	npcs = [];
	objects = [];

	static descriptions = require('../data/descriptions.json');

	/**
	 * @param {string} asset
	 * @param {boolean} collision
	 * @param {string} description
	 * @param {array} events
	 */
	constructor(asset, collision, description, events) {
		this.asset = asset;
		this.collision = collision;
		this.description = Tile.descriptions[description];
		this.events = events;//events.map(e => new Event(e));
	}

	setPCS(players) {
		this.pcs = players;
	}

	setNPCS(npcs) {
		this.npcs = npcs;
	}

	setItems(items) {
		this.objects = items;
	}

	//TODO: rename to push?
	pushPC(player) {
		this.pcs.push(player);
	}

	pushNPC(npc) {
		this.npcs.push(npc);
	}

	pushItem(item) {
		this.objects.push(item);
	}

	getDescription() {
		return this.description;
	}

	getEvents() {
		return this.events;
	}

	getCollision() {
		return this.collision;
	}

	removePlayer(player) {
		this.setPCS(this.removeEntityFromArray(player, this.pcs));
	}

	removeNPC(npc) {
		this.setNPCS(this.removeEntityFromArray(npc, this.npcs));
	}

	removeItem(item) {
		this.setItems(this.removeEntityFromArray(item, this.objects));
	}

	removeEntityFromArray(entity, array) {
		let remainingEntities = [];
		for (let i = 0; i < array.length; i++) {
			if (array[i].id !== entity.id) {
				remainingEntities.push(array[i]);
			}
		}
		return remainingEntities;
	}

	getAllEntities(blackListPC) {
		return {
			pcs: this.pcs.filter(pc => pc.id !== blackListPC),
			npcs: this.npcs,
			objects: this.objects,
		};
	}
}

module.exports = Tile;
