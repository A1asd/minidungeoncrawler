const Equipment = require("./Equipment");

class Weapon extends Equipment {
	constructor(ref) {
		super(ref, 'weapon');
	}
}

module.exports = Weapon;
