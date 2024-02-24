class Stat {
	key; label; value; modifications = 0;

	constructor(key, label, value) {
		this.key = key;
		this.label = label;
		this.value = value;
	}

	modify(value) {
		this.modifications += value;
	}
}

module.exports = Stat;
