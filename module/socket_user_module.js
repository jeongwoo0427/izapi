
const users = new Map();

module.exports = {
    addUser : (socketId) =>{
        const user = {
            userInfo : null,
            connectedTime: Date.now(), 
        }
        users.set(socketId, user);
    },
    updateUserInfo : (socketId, userInfo) =>{
        //console.log(userInfo);
        const user = users.get(socketId);
        user.userInfo = userInfo;
        users.set(socketId,user);
    },
    userJoinRoom: (socketId , userInfo, roomCode) =>{
        
        const user = users.get(socketId);

        //console.log(user);

        user.userInfo = userInfo;
        user.roomCode = roomCode;

        users.set(socketId,user);

    },
    userQuitRoom : (socketId) =>{
        const user = users.get(socketId);
        user.roomCode = null;

        users.set(socketId,user);
    },
    getUserBySocket : (socketId) =>{
        return users.get(socketId);
    },
    getUserByID : (userId)=>{
      //  console.log(userId);
        let user;
        users.forEach((value,key,map)=>{
            if(value.userInfo?.userId == userId) user = map;
        });
        return user;
    },
    getUsers : () =>{
        return users;
    },

    getRoomUsers : (roomCode) =>{
        const roomUsers = new Map();
        users.forEach((value,key,map)=>{
            if(value.roomCode == roomCode){
                roomUsers.set(key,value);
            }
        });
        return roomUsers;
    },
    deleteUser : (socketId) =>{
        users.delete(socketId);
    }
}