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


// const rooms = {
//     'code1234': {
//         users: [],
//     }
// };

const rooms = new Map();
rooms.set('code1234', {
    users: new Map()
});

// CORS 설정
app.use(cors());

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.send('<h1>Socket.io Server is running</h1>');
});

// setInterval(() => {
//     rooms.forEach((value,key,map)=>{
//         value.users.forEach((value,key,map)=>{
//             io.to(key).emit('hey',key);
//             console.log('sent message to ',key);
//         });
//     });
    
// }, 1000);


// Socket.io 연결 이벤트 처리
io.on('connection', (socket) => {
    console.log(`[${Date.now()}]User connected:`, socket.id);

    socket.on('joinRoom', (data) => {
        const { roomCode, user } = data;
        const userInfo = {
            socketId: socket.id,
            id: user.id,
            name: user.name,
            connectedTime: Date.now()
        }
        if (rooms.get(roomCode) == null) return socket.emit('error', { code: 'ROOM_NOT_FOUND' });



        const users = rooms.get(roomCode).users;//users에서 오류가 난다면 방 생성시 발생한 오류


        
        //기존 사용자가 있는지 먼저 확인 (아이디 조건도 추가하기)
        const sameUser = users.get(userInfo.socketId);

        if (sameUser == null) {
            rooms.get(roomCode).users.set(userInfo.socketId, userInfo);
        } else {
            //소켓이 바뀌었을 경우 새로운 정보로 갱신
            sameUser.id = userInfo.id;
            sameUser.name = userInfo.name;
        }

        socket.join(roomCode);

        if (sameUser == null) {
            //기존에 없는 사용자가 들어올 경우 모든 사용자에게 알림
            io.to(roomCode).emit('roomJoined', {
                roomCode,
                userInfo
            });
        }

        console.log(`[${Date.now()}]joined room!`);
        console.log(rooms.get(roomCode));
    });

    socket.on('quitRoom', (data) => {
        const { roomCode, user } = data;
        const userInfo = {
            socketId: socket.id,
            id: user.id,
            name: user.name,
            connectedTime: Date.now()
        }
        if (rooms.get(roomCode) == null) return socket.emit('error', { code: 'ROOM_NOT_FOUND' });

        //rooms[roomCode].users.find((user) => {;
        rooms.get(roomCode).users.delete(socket.id);

        io.to(roomCode).emit('roomLeft', {
            roomCode,
            userInfo
        });

        console.log(`[${Date.now()}]left room!`);
        console.log(rooms.get(roomCode));

    });

    socket.on('disconnect', () => {

        console.log('user disconnected');
    });
});

// 서버 시작
const PORT = 34;
http.listen(PORT, () => {
    console.log(`Socket Server is listening on port`, PORT);
});