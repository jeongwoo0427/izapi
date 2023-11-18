
const users = new Map();

module.exports = {
    addUser : (socketId,userInfo) =>{
        const user = {
            userInfo : userInfo,
            connectedTime: Date.now(), 
        }
        users.set(socketId, user);
    },
    userJoinRoom: (socketId , userInfo, roomCode) =>{
        
        const user = users.get(socketId);

        console.log(user);

        user.userInfo = userInfo;
        user.roomCode = roomCode;

        users.set(socketId,user);

    },
    userQuitRoom : (socketId) =>{
        const user = users.get(socketId);
        user.roomCode = null;

        users.set(socketId,user);
    },
    getUser : (socketId) =>{
        return users.get(socketId);
    },
    getUsers : () =>{
        return users;
    },
    deleteUser : (socketId) =>{
        users.delete(socketId);
    }
}