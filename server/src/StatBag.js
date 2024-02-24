const Stat = require("./Stat");

class StatBag {
	bag = [];
	STRENGTH = 'strength';
	INTELLIGENCE = 'intelligence';
	AGILITY = 'agility';
	CONSTITUTION = 'constitution';
	DEFIANCE = 'defiance';

	constructor(strength, intelligence, agility, constitution, defiance) {
		this.bag.push(new Stat(this.STRENGTH, 'strength', strength));
		this.bag.push(new Stat(this.INTELLIGENCE, 'intelligence', intelligence));
		this.bag.push(new Stat(this.AGILITY, 'agility', agility));
		this.bag.push(new Stat(this.CONSTITUTION, 'constitution', constitution));
		this.bag.push(new Stat(this.DEFIANCE, 'defiance', defiance));
	}

	get(key) {
		return this.bag.filter(stat => key === stat.key)[0];
	}

	getStrength() {
		return this.get(this.STRENGTH);
	}

	getIntelligence() {
		return this.get(this.INTELLIGENCE);
	}

	getAgility() {
		return this.get(this.AGILITY);
	}

	getConstitution() {
		return this.get(this.CONSTITUTION);
	}

	getDefiance() {
		return this.get(this.DEFIANCE);
	}
}

module.exports = StatBag;