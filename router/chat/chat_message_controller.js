const ChatMessageModel = require('../../models/chat_message_model');
const CN = ChatMessageModel.CN;

module.exports = {
    getMessages: async (req, res, next) => {
        try {
            const result = await ChatMessageModel.findAll({
                where: {
                    [CN.roomCode]: req.params[CN.roomCode]
                },order: [['id', 'DESC']],
            });
            return res.send(result);
        } catch (err) {
            return next(err);
        }
    }
}