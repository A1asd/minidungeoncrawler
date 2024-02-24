const Item = require("../Item");

class Equipment extends Item {
	slot;
	equippable = true;

	constructor(ref, slot) {
		super(ref);
		this.slot = slot;
	}
}

module.exports = Equipment;
