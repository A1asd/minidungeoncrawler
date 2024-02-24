class ItemRequirement {
	static HAS = 'has'

	constructor(operator, itemRef) {
		this.operator = operator;
		this.itemRef = itemRef;
	}

	meetsRequirement(player) {
		if (this.operator === ItemRequirement.HAS) {
			return player.inventory.filter(items => items.ref === this.itemRef).length > 0;
		}
		return false;
	}
}

module.exports = ItemRequirement;
