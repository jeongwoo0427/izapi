
const users = new Map();

module.exports = {
    addUser : (socketId,userId,userName) =>{
        const user = {
            userId : userId,
            userName : userName,
            connectedTime: Date.now(), 
        }
        users.set(socketId, user);
    },
    userJoinRoom: (socketId,userId,userName, roomCode) =>{
        
        const user = users.get(socketId);

        console.log(user);

        user.userId = userId;
        user.userName = userName;
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