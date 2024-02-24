class Position {
	x; y; map;

	constructor(x, y, map) {
		this.x = x;
		this.y = y;
		this.map = map;
	}

	addVector(vector) {
		return {x: this.x + vector.x, y: this.y + vector.y}
	}

	getMap() {
		return this.map;
	}

	toString() {
		return '(x: ' + this.x + ', y: ' + this.y + ')';
	}
}

module.exports = Position;
