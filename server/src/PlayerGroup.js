class PlayerGroup {
	id = 0;
	playerList = [];
	count = 0;

	constructor() {
		this.id = ++this.count;
	}

	static createGroup() {
		return new PlayerGroup();
	}

	addPlayer(player) {
		if (!this.isPlayerInGroup(player.id)) {
			this.playerList.push(player);
			player.setGroup(this.id);
		}
	}

	removePlayer(player) {
		let remainingPlayers = [];
		for (let i = 0; i < this.playerList.length; i++) {
			if (this.playerList[i].id !== player.id) {
				remainingPlayers.push(this.playerList[i]);
			} else {
				player.removeGroup();
			}
		}
		this.playerList = remainingPlayers;
	}

	isPlayerInGroup(playerId) {
		return this.playerList.filter(player => player.id === playerId)[0];
	}
}

module.exports = PlayerGroup;
