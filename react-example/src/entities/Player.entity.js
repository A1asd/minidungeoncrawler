class Player {
	id;
	attack = 0;
	hp = 0;
	maxHp = 0;
	inventory = [];
	group = null;
	statBag = {bag:[]};
	equipment = {weapon: null, head:null, chest:null, arms:null, legs:null};
}

export default Player;
