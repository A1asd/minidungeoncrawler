const Equipment = require("./Equipment");

class LegsEquipment extends Equipment {
	constructor(ref) {
		super(ref, 'legs');
	}
}

module.exports = LegsEquipment;
