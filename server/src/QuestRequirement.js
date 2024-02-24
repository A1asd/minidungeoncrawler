class QuestRequirement {
	static ANY = 'any'

	constructor(operator, quest) {
		this.operator = operator;
		this.quest = quest;
	}

	meetsRequirement(player) {
		if (this.operator === QuestRequirement.ANY) {
			return player.questList.filter(quest => quest.id === this.quest).length > 0;
		}
		return false;
	}
}

module.exports = QuestRequirement;
