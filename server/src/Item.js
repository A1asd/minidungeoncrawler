class Item {
	ref;
	id;

	static counter = 0;

	constructor(ref) {
		this.id = ++Item.counter;
		this.ref = ref;
	}
}

module.exports = Item;