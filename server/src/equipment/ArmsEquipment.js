const Equipment = require("./Equipment");

class ArmsEquipment extends Equipment {
	constructor(ref) {
		super(ref, 'arms');
	}
}

module.exports = ArmsEquipment;
