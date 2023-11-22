
require('./servers/api_server');
require('./servers/chat_socket_server');
require('./servers/game_socket_server')



//불안정 코드로 디버깅일때만 사용하기
process.on('uncaughtException', (err) => {
    console.log('UncaughtException Occured !');
    console.log(err.stack);
})