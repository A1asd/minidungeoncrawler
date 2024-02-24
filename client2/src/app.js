var socket = new WebSocket("ws://localhost:8080", 'echo-protocol')

socket.onmessage = function(message) {
	let data = JSON.parse(message.data);
	switch(data.action) {
		case ('loginSuccess'): handleLoginSuccess();
		case ('drawMap'): drawMap(data.data); break;
		case ('updateLocation'): updateLocation(data.data); break;
		case ('recieveMessage'): outputMessage(data.data); break;
		default: console.log('nothing')
	}
}

function handleLoginSuccess() {
	let loginForm = document.getElementById('login-form');
	loginForm.style.display = 'none';
}

function drawMap(tiles) {
	let mapField = document.getElementById('mapField');
	mapField.innerHTML = '';
	for (let i = 0; i < tiles.length; i++) {
		for (let j = 0; j < tiles[i].length; j++) {
			let directional = (i==0|i==2?j==1:(j==0|j==2?i==1:false))
			// wenn i = 0 oder 2 und j = 1 ODER wenn i = 1 und j = 0 oder 2
			if (directional) drawTileOnMap(tiles[i][j], mapField, [j-1, i-1]);
			else drawTileOnMap(tiles[i][j], mapField)
		}
	}
}

function outputMessage(messageObject) {
	let chatWindow = document.getElementById('chat-messages');
	let chatMessageNode = document.createElement('div');
	chatMessageNode.innerHTML = messageObject.user + ': ' + messageObject.message;
	chatWindow.appendChild(chatMessageNode);
}

function updateLocation(gameObjects) {
	let playerWrapper = document.getElementById('current-location-players');
	playerWrapper.innerHTML = '';
	gameObjects.pcs.forEach(pc => {
		let pcContainer = document.createElement('div');
		pcContainer.innerHTML = pc.id;
		playerWrapper.appendChild(pcContainer)
	})
	let enemyWrapper = document.getElementById('current-location-enemies');
	enemyWrapper.innerHTML = '';
	gameObjects.npcs.forEach(npc => {
		let npcContainer = document.createElement('div');
		npcContainer.innerHTML = npc.id;
		enemyWrapper.appendChild(npcContainer)
	})
}

function drawTileOnMap(tile, map, direction = null) {
	let tileNode = document.createElement('div');
	tileNode.classList.add('map-tile');
	if (direction) tileNode.addEventListener('click', function() {
		move({x:direction[0], y:direction[1]})
	})
	tileNode.innerHTML = tile.asset + '(' + tile.pcs.length + ')';
	tileNode.style.cursor = 'pointer';
	map.appendChild(tileNode);
}

function login() {
	let user = document.getElementById('username-field').value;
	let password = document.getElementById('password-field').value;
	socket.send(JSON.stringify({action: 'login', data:{user:user, password:password}}));
}

/**
 * @param {Object} vector
 * @param {number} vector.x
 * @param {number} vector.y
 */
function move(vector) {
	socket.send(JSON.stringify({action: 'move', data:vector}));
}

function chat() {
	let message = document.getElementById('chat-message-input').value;
	document.getElementById('chat-message-input').value = '';
	let channel = 'all';
	socket.send(JSON.stringify({action: 'chat', data:{message:message, channel:channel}}));
}

/* position:{itemId:number} */
function useItem(itemId) {
	connection.send(JSON.stringify({action: 'useItem', data:itemId}));
}

/* position:{objectId:number} */
function interact(objectId) {
	connection.send(JSON.stringify({action: 'useItem', data:objectId}));
}

//var WebSocketClient = require('websocket').client;
//var client = new WebSocketClient();
//client.connect('ws://localhost:8080/', 'echo-protocol');

//client.on('connectFailed', function(error) {
//    console.log('Connect Error: ' + error.toString());
//});
//
//client.on('connect', function(connection) {
//    console.log('WebSocket Client Connected');
//    connection.on('error', function(error) {
//        console.log("Connection Error: " + error.toString());
//    });
//    connection.on('close', function() {
//        console.log('echo-protocol Connection Closed');
//    });
//    connection.on('message', function(message) {
//        if (message.type === 'utf8') {
//            console.log("Received: '" + message.utf8Data + "'");
//        }
//    });
//
//    function sendNumber() {
//        if (connection.connected) {
//            var number = Math.round(Math.random() * 0xFFFFFF);
//			number = JSON.stringify({action:'number', data:number});
//			console.log(number);
//            connection.send(number);
//            setTimeout(sendNumber, 1000);
//        }
//    }
//    //sendNumber();
//
	/* position:{x:number, y:number} */
//});
