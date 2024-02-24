const EventAction = require('./EventAction');

class Event {
	static descriptions = require('../data/events.json');
	actions = [];

	constructor(id) {
		this.id = id;
		let data = Event.descriptions[id];
		this.description = data.description;
		if (data.actions.length > 0) {
			this.actions = data.actions.map(action => new EventAction(action.id, action.label, action.requirement));
		}
		this.requirement = data.requirement;
	}

	getActions() {
		return this.actions;
	}

	meetsRequirements(player) {
		return true;
	}
}

module.exports = Event;
