"use strict";
/*
	reply udp commmands
*/

/*
	Referenced by http://www.cs.sfu.ca/CourseCentral/433/bfraser/solutions/11-Node.js/
*/

var socketio = require('socket.io');
var dgram = require('dgram');
var io;

exports.listen = function(server){
	io = socketio.listen(server);
	io.set('log level 1');
	
	io.sockets.on('connection', function(socket) {
		handleConnections(socket);
	});
};

function handleCommand(command, replyCommand, socket){
	socket.on(command, function(data){
		console.log('cmd: ' + data);

		var PORT = 12345;
		var HOST = '192.168.7.2';
		var buffer = new Buffer(data);
		var client = dgram.createSocket('udp4');
		client.send(buffer, 0, buffer.length, PORT, HOST, function(err,bytes){
		    if (err) 
		    	throw err;
		    console.log('UDP message sent to ' + HOST +':'+ PORT);
		});

		client.on('listening', function(){
			var address = client.address();
		    console.log('UDP Client: listening on ' + address.address + ":" + address.port);
		});

		client.on('message', function(message, remote){
			console.log("UDP Client: message Rx" + remote.address + ':' + remote.port +' - ' + message);
		    
		    var reply = message.toString('utf8')
		    socket.emit(replyCommand, reply);
		    
		    client.close();
		});

		client.on("UDP Client: close", function() {
		    console.log("closed");
		});

		client.on("UDP Client: error", function(err) {
		    console.log("error: ",err);
		});
	});
};

function handleConnections(socket){
	handleCommand('prime','commandReply',socket);
	handleCommand('modeCommand','modeData',socket);
	handleCommand('volumeCommand','volumeData',socket);
	handleCommand('tempoCommand','tempoData',socket);
};








































