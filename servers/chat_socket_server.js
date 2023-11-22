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
    res.send('<h1>Chat Socket Server is running</h1>');
});


const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});





// setInterval(() => {
//     rooms.forEach((value,key,map)=>{
//         value.users.forEach((value,key,map)=>{
//             io.to(key).emit('hey',key);
//             console.log('sent message to ',key);
//         });
//     });

// }, 1000);
function callUpdateRoomUsers(roomCode, io) {
    const roomUsers = [];
    getRoomUsers(roomCode).forEach((value, key, map) => {
        roomUsers.push(value.userInfo);
    });

    //한 채팅방 안에 다른 소켓의 같은 아이디가 있을 경우 알아서 중복에대해 처리를 하도록.
    const uniqueRoomUsers = [];
    roomUsers.forEach((element) => {
        let addThis = true;
        for (let i = 0; i < uniqueRoomUsers.length; i++) {
            if (element.userId == uniqueRoomUsers[i].userId) addThis = false;
        }
        if (addThis) uniqueRoomUsers.push(element);
    })

    // console.log(roomUsers);
    io.to(roomCode).emit('updateRoomUsers', uniqueRoomUsers);
}

// Socket.io 연결 이벤트 처리
io.on('connection', (socket) => {
    console.log(`[${Date.now()}]User connected:`, socket.id);
    addUser(socket.id);

    socket.on('joinRoom', (data) => {
        const { roomCode, userInfo } = data;

        const beforeSocket = getUserBySocket(socket.id);

        socket.join(roomCode);

        //기존에 없는 사용자가 들어올 경우 모든 사용자에게 알림
        if (beforeSocket?.roomCode == null) {

            io.to(roomCode).emit('roomJoined', {
                socketId: socket.id,
                userInfo: userInfo,
            });
        }

        userJoinRoom(socket.id, userInfo, roomCode);
        callUpdateRoomUsers(roomCode, io);

        //console.log(`[${Date.now()}]joined room!`);
        //console.log(getUsers());
    });

    socket.on('updateUserInfo', (data) => {

        updateUserInfo(socket.id, data);
        const user = getUserBySocket(socket.id);
        if (user?.roomCode != null) {
            //console.log(user?.roomCode);
            callUpdateRoomUsers(user?.roomCode, io);
        }
    });

    socket.on('sendMessage', (data) => {

        const user = getUserBySocket(socket.id);
        //console.log(user);
        if (user?.roomCode == data.roomCode) {
            io.to(data.roomCode).emit('messageReceived', data);
            //console.log(`[${Date.now()}]message sent! `, data);
        }

        ChatMessageModel.create({
            [CN.uuid]: data[CN.uuid],
            [CN.roomCode]: data[CN.roomCode],
            [CN.type]: data[CN.type],
            [CN.content]: data[CN.content],
            [CN.userId]: data[CN.userId],
            [CN.userName]: data[CN.userName]
        })
    });

    socket.on('callUpdateUsers', (_) => {

        const user = getUserBySocket(socket.id);
        if (user?.roomCode != null) {
            //console.log(user?.roomCode);
            callUpdateRoomUsers(user?.roomCode, io);
        }

    });

    socket.on('quitRoom', (_) => {

        const user = getUserBySocket(socket.id);
        const roomCode = user.roomCode;

        if (roomCode != null) {
            io.to(user.roomCode).emit('roomLeft', {
                'socketId': socket.id,
                'userInfo': user
            });
        }

        userQuitRoom(socket.id);

        callUpdateRoomUsers(roomCode, io);

        // console.log(`[${Date.now()}]left room!`);
        // console.log(getUsers());
    });

    socket.on('disconnect', () => {
        const roomCode = getUserBySocket(socket.id)?.roomCode;
        deleteUser(socket.id);
        callUpdateRoomUsers(roomCode, io);
        console.log('user disconnected');
    });
});



// 서버 시작
const PORT = 34;
http.listen(PORT, () => {
    console.log(`Chat Server is listening on port`, PORT);
});