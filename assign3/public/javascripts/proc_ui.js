/*
	Referenced by http://www.cs.sfu.ca/CourseCentral/433/bfraser/solutions/11-Node.js/
*/

"use strict";

var socket = io.connect();

$(document).ready(function(){
	console.log("Document loaded");
	window.setInterval(function(){sendCommand('uptime')},1000);

	socket.on('replyData', function(result){
		var fileName = result.fileName;
		var contents = result.contents;
		var DOMObj;

		switch(fileName){
			case 'uptime':
				DOMObj = $('#uptimeid');
				break;
			default:
				console.log("Unknown DOM Object: " + fileName);
				return;
		}

		contents = replaceAll(contents, "\n", "<br/>");
		DOMObj.html(contents);
	});
});


function sendCommand(file) {
	console.log("Requesting '" + file + "'");
	socket.emit('proc', file);
}

function replaceAll(str, find, replace) {
	return str.replace(new RegExp(find, 'g'), replace);
}

