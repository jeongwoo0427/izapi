const express = require('express');
const app = express();

const port = 34;
const server = app.listen(port, function() {
    console.log('Socket Server is listening on port',port);
});

const SocketIO = require('socket.io');
const io = SocketIO(server, {path: '/socket.io'});

io.on('connection', function (socket) {
    console.log(socket.id, ' connected...');
    
    // broadcasting a entering message to everyone who is in the chatroom
    io.emit('msg', `${socket.id} has entered the chatroom.`);
  
  	// message receives
    socket.on('msg', function (data) {
        console.log(socket.id,': ', data);
        // broadcasting a message to everyone except for the sender
        socket.broadcast.emit('msg', `${socket.id}: ${data}`);
    });

    // user connection lost
    socket.on('disconnect', function (data) {
        io.emit('msg', `${socket.id} has left the chatroom.`);
    });
});

app.get('/chat', function(req, res) {
    res.sendFile(__dirname + '/html/socket_client.html');
});