const Equipment = require("./Equipment");

class HeadEquipment extends Equipment {
	constructor(ref) {
		super(ref, 'head');
	}
}

module.exports = HeadEquipment;
