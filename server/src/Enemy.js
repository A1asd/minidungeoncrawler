const Position = require("./Position");

class Enemy {
	id; position; rewards; hp; attack;

	state = 'idle';

	/**
	 * @param {number} id
	 * @param {Position} position
	 */
	constructor(id, position, rewards, hp, attack) {
		this.id = id;
		this.position = position;
		this.rewards = rewards;
		this.hp = hp;
		this.attack = attack;
	}

	/**
	 * @param {Position} position
	 */
	setPosition(position) {
		this.position = position;
	}

	getPosition() {
		return this.position;
	}
}

module.exports = Enemy;
