var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});

client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });

    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
			number = JSON.stringify({action:'number', data:number});
			console.log(number);
            connection.send(number);
            setTimeout(sendNumber, 1000);
        }
    }
    //sendNumber();

	/* position:{x:number, y:number} */
	function move(vector) {
		connection.send(JSON.stringify({action: 'move', data:vector}));
	}
	move({x:2,y:3})

	/* position:{itemId:number} */
	function useItem(itemId) {
		connection.send(JSON.stringify({action: 'useItem', data:itemId}));
	}

	/* position:{objectId:number} */
	function interact(objectId) {
		connection.send(JSON.stringify({action: 'useItem', data:objectId}));
	}
});

client.connect('ws://localhost:8080/', 'echo-protocol');
