var WebSocketServer = require('websocket').server;
var http = require('http');

const Map = require('./src/Map');
const Game = require('./src/Game');
const World = require('./src/World');
const Position = require('./src/Position');
const ActionHandler = require('./src/ActionHandler');
const Enemy = require('./src/Enemy');
const Item = require('./src/Item');
const gameWorld = require('./src/Game');
const Updater = require('./src/Updater');
const HeadEquipment = require('./src/equipment/HeadEquipment');
const ChestEquipment = require('./src/equipment/ChestEquipment');
const LegsEquipment = require('./src/equipment/LegsEquipment');
const ArmsEquipment = require('./src/equipment/ArmsEquipment');
const Weapon = require('./src/equipment/Weapon');

var server = http.createServer(function(request, response) {
	console.log((new Date()) + ' Received request for ' + request.url);
	response.writeHead(404);
	response.end();
});
server.listen(8080, function() {
	console.log((new Date()) + ' Server is listening on port 8080');
});

wss = new WebSocketServer({
	httpServer: server,
	// You should not use autoAcceptConnections for production
	// applications, as it defeats all standard cross-origin protection
	// facilities built into the protocol and the browser.  You should
	// *always* verify the connection's origin and decide whether or not
	// to accept it.
	autoAcceptConnections: false
});

function originIsAllowed(origin) {
  // put logic here to detect whether the specified origin is allowed.
  return true;
}

wss.on('request', function(request) {
	if (!originIsAllowed(request.origin)) {
	  // Make sure we only accept requests from an allowed origin
	  request.reject();
	  console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
	  return;
	}

	var connection = request.accept('echo-protocol', request.origin);
	console.log((new Date()) + ' Connection accepted.');
	connection.on('message', function(message) {
		let data = JSON.parse(message.utf8Data);
		handleAction(connection, data.action, data.data);
		//if (message.type === 'utf8') {
		//    console.log('Received Message: ' + message.utf8Data);
		//    connection.sendUTF(message.utf8Data);
		//}
		//else if (message.type === 'binary') {
		//    console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
		//    connection.sendBytes(message.binaryData);
		//}
	});
	connection.on('close', function(reasonCode, description) {
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
		//let player = world.getPlayer(connection.id);
		//world.map.removePlayerAtLocation(player, player.position)
	});
});

function handleAction(connection, action, data) {
	let actionString = action.charAt(0).toUpperCase() + action.slice(1);
	try {
		actionHandler['handle' + actionString + 'Action'](connection, data);
	} catch (e) {
		console.error('actionString: ' + action + '\n' + e.name + ': ' + e.message);
	}
}

let hub_town_map = new Map('townmap.json');
let spawnPoint = new Position(4,2);
/*const hub_town = new World(hub_town_map, spawnPoint);
let id_hub_town = 'hub-town';
gameWorld.addWorld(id_hub_town, hub_town);
*/
gameWorld.createWorld(hub_town_map, spawnPoint)

let dungeon_1_map = new Map('map3.json');
let enemy = new Enemy('gate keeper', new Position(4,3), [new Item('key'), new Weapon('hammer')], 10, 3);
let healBottle = new Item('healbottle');
//const dungeon_1 = new World(dungeon_1_map, spawnPoint);
let dungeon_1 = gameWorld.createWorld(dungeon_1_map, spawnPoint);
dungeon_1.spawnNPC(enemy);
healBottle.usable = true;
healBottle.maxCharges = 3;
healBottle.charges = 3;
healBottle.health = 5;
healBottle.use = function(connection, player) {
	let updater = new Updater(connection);
	if (this.charges > 0) {
		player.heal(this.health);
		this.charges--;
		updater
			.updatePlayer(player)
			.sendChatMessage(connection.id, 'hat eine Heilflasche benutzt und heilt sich um ' + this.health + ' Lebenspunkte', 'all');
	} else {
		updater
			.sendChatMessage(connection.id, 'versucht noch einen letzten Tropfen aus seiner leeren Heilflasche zu bekommen', 'all');
	}
};

let helm = new HeadEquipment('helm des bären');
let helm2 = new HeadEquipment('Helm des Löwen');
helm.onEquip = function(player) {};
helm.onUnequip = function(player) {};

let chestplate = new ChestEquipment('Brustplatte des Bären');
let legarmor = new LegsEquipment('Hose des Bären');
let armarmor = new ArmsEquipment('Handschuhe des Bären');
let sword = new Weapon('Schwert des Bären');

dungeon_1.spawnItem(helm, new Position(4, 2));
dungeon_1.spawnItem(helm2, new Position(4, 2));
dungeon_1.spawnItem(chestplate, new Position(4, 2));
dungeon_1.spawnItem(legarmor, new Position(4, 2));
dungeon_1.spawnItem(armarmor, new Position(4, 2));
dungeon_1.spawnItem(sword, new Position(4, 2));

dungeon_1.spawnItem(healBottle, new Position(4, 2));
//let id_dungeon = 'dungeon-1';
//gameWorld.addWorld(id_dungeon, dungeon_1);

let actionHandler = new ActionHandler(dungeon_1);
