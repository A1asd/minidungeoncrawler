const Equipment = require("./Equipment");

class ChestEquipment extends Equipment {
	constructor(ref) {
		super(ref, 'chest');
	}
}

module.exports = ChestEquipment;
