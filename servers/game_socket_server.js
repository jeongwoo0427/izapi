const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const { addUser, updateUserInfo, userJoinRoom, getUserBySocket, getUserByID, getUsers, deleteUser, userQuitRoom, getRoomUsers } = require('../module/socket_user_module');
const ChatMessageModel = require('../models/chat_message_model');
const CN = ChatMessageModel.CN;

// CORS 설정
app.use(cors());
// 기본 라우트 설정
app.get('/', (req, res) => {
    res.send('<h1>Game Socket Server is running</h1>');
});


const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const connections = new Map();


// Socket.io 연결 이벤트 처리
io.on('connection', (socket) => {
    console.log(`[${Date.now()}]User connected:`, socket.id);


    socket.on('joinRoom', (data) => {
        console.log(data);
        connections.set(socket.id,{
            socketId:socket.id,
            positionX : data.positionX,
            positionY : data.positionY
        });

        const result = [];
        connections.forEach((value,key,map)=>{result.push(value)});
        
        io.emit('roomJoined',result);

        //console.log(`[${Date.now()}]joined room!`);
        //console.log(getUsers());
    });

    socket.on('updatePlayer', (data) =>{
        data.socketId = socket.id;
        connections.get(socket.id,data);
        io.emit('playerUpdated',data);
    })




    socket.on('disconnect', () => {
        io.emit('roomQuit',socket.id);
        connections.delete(socket.id);
        console.log('user disconnected');
    });
});



// 서버 시작
const PORT = 35;
http.listen(PORT, () => {
    console.log(`Game Server is listening on port`, PORT);
});