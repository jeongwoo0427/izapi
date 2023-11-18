const router = require('express').Router();
const ChatMessageModel = require('../../models/chat_message_model');
const chatMessageController = require('./chat_message_controller');
const CN = ChatMessageModel.CN;

router.get(`/message/:${CN.roomCode}`,chatMessageController.getMessages);


module.exports = router;