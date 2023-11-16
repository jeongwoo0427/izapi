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
        rooms[roomCode].users.push(user);
        socket.join(roomCode); 
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