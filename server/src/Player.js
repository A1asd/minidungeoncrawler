const Position = require("./Position");
const StatBag = require("./StatBag");

class Player {
	id; position;
	attack = 3;
	hp = 0;
	maxHp = 0;
	inventory = [];
	statBag = new StatBag(6,3,3,4,1);
	group = null;
	equipment = {
		weapon: null,
		head: null,
		chest: null,
		arms: null,
		legs: null,
		rune: null,
	}

	/**
	 * @param {number} id
	 * @param {Position} position
	 */
	constructor(id, position) {
		this.id = id;
		this.position = position;
		this.hp = this.setMaxHealth();
	}

	/**
	 * @param {Position} position
	 */
	setPosition(position) {
		this.position = position;
	}

	setMaxHealth() {
		return this.maxHp = this.statBag.getConstitution().value * 2;
	}

	getPosition() {
		return this.position;
	}

	getStats() {
		return this.statBag;
	}

	addToInventory(item) {
		this.inventory.push(item);
	}

	removeFromInventory(item) {
		let remainingItems = [];
		for (let i = 0; i < this.inventory.length; i++) {
			if (this.inventory[i].ref !== item) {
				remainingItems.push(this.inventory[i]);
			}
		}
		this.inventory = remainingItems;
	}

	getItem(itemId) {
		return this.inventory.filter(item => item.id === itemId)[0];
	}

	equip(equipment) {
		if (this.equipment[equipment.slot]) this.unequip(equipment.slot);
		this.removeFromInventory(equipment.ref);
		this.equipment[equipment.slot] = equipment;
	}

	unequip(slot) {
		this.addToInventory(this.equipment[slot]);
		this.equipment[slot] = null;
	}

	heal(amount) {
		this.hp = Math.min(this.hp + amount, this.maxHp);
	}

	setGroup(group) {
		this.group = group;
	}

	removeGroup() {
		this.group = null;
	}
}

module.exports = Player;
