"use strict";
/*
	client side: connect with server when the webpage is loaded
*/

/*
	Referenced by http://www.cs.sfu.ca/CourseCentral/433/bfraser/solutions/11-Node.js/
*/

var socket = io.connect();

$(document).ready(function(){
	window.setInterval(function(){sendRequest('modeCommand','modeData');
								sendRequest('volumeCommand','volumeData');
								sendRequest('tempoCommand','tempoData');}, 1000);	
	
	$('#modeNone').click(function(){sendCommand("modeNone");});
	$('#modeRock1').click(function(){sendCommand("modeRock1");});
	$('#modeRock2').click(function(){sendCommand("modeRock2");});

	$('#hihat').click(function(){sendCommand("hihat");});
	$('#snare').click(function(){sendCommand("snare");});
	$('#base').click(function(){sendCommand("base");});

	$('#volumeDown').click(function(){sendCommand("volumeDown");});
	$('#volumeUp').click(function(){sendCommand("volumeUp");});

	$('#tempoDown').click(function(){sendCommand("tempoDown");});
	$('#tempoUp').click(function(){sendCommand("tempoUp");});

	
	socket.on('commandReply', function(result) {
		var newDiv = $('<div></div>').text(result);
		$('#modediv').append(newDiv);
		$('#modediv').scrollTop($('#modediv').prop('scrollHeight'));
	});

	socket.on('modeReply', function(result){
		var newDiv = $('<span></span>').text(result);
		$('#modeid').html(newDiv);
	});

	socket.on('volumeReply', function(result){
		var newDiv = $('<span></span>').text(result);
		$('#volumeid').html(newDiv);
	});

	socket.on('tempoReply', function(result){
		var newDiv = $('<span></span>').text(result);
		$('#tempoid').html(newDiv);
	});

});


function sendCommand(message){
	socket.emit('prime', message);
};

function sendRequest(command, message){
	socket.emit(command, message);
};