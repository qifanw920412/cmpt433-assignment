"use strict";
/* 	
After creating package.json, install modules:
    $ npm install

Launch server with:
   	$ node server.js
 */

/*	
	Referenced by http://www.cs.sfu.ca/CourseCentral/433/bfraser/solutions/11-Node.js/
*/


var PORT_NUMBER = 8088;

var http = require('https');
var fs   = require('fs');
var path = require('path');
var mime = require('mime');

var options = {
	key:  fs.readFileSync('./key.pem'),
	cert: fs.readFileSync('./key-cert.pem')
}

var server = http.createServer(options, function(request, response) {
	var filePath = false;
	
	if (request.url == '/') {
		filePath = 'public/index.html';
	} else {
		filePath = 'public' + request.url;
	}
	
	var absPath = './' + filePath;
	serveStatic(response, absPath);
});

server.listen(PORT_NUMBER, function() {
	console.log("Server listeneing on port " + PORT_NUMBER);
});

function serveStatic(response, absPath) {
	fs.exists(absPath, function(exists) {
		if (exists) {
			fs.readFile(absPath, function(err, data) {
				if (err) {
					send404(response);
				} else {
					sendFile(response, absPath, data);
				}
			});
		} else {
			send404(response);
		}
	});
}

function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(
			200,
			{"content-type": mime.lookup(path.basename(filePath))}
		);
	response.end(fileContents);
}


var beatboxServer = require('./lib/beatbox_server');
var procServer = require('./lib/proc_server');
beatboxServer.listen(server);
procServer.listen(server);
