const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const rooms={
    'code1234':{
        users : [],
    }
};

// CORS 설정
app.use(cors());

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.send('<h1>Socket.io Server is running</h1>');
});


// Socket.io 연결 이벤트 처리
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinRoom', (data) =>{
        const {roomCode, user} = data;

        if(rooms[roomCode] == null) return socket.emit('error', { code: 'ROOM_NOT_FOUND' });

        const userInfo = {
            socketId : socket.id,
            id : user.id,
            name : user.name,
            connectedTime : Date.now()
        }
        rooms[roomCode].users.push(userInfo); //users에서 오류가 난다면 방 생성시 발생한 오류

        socket.join(roomCode); 
        io.to(roomCode).emit('roomJoined', {
            roomCode,
            userInfo
        })
        console.log(rooms);
    });

    socket.on('disconnect', () => {
        
        console.log('user disconnected');
    });
});

// 서버 시작
const PORT = 34;
http.listen(PORT, () => {
    console.log(`Socket Server is listening on port`,PORT);
});