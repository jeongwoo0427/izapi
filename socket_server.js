const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = 34;

io.on('connection', (socket) => {
    console.log('some user connected!');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
});


http.listen(port, () =>{
    console.log('Socket Server is listening on port',port);
})