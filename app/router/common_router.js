const kakaoController = require('../controller/kakao_controller');

const router = require('express').Router();


router.post('/messageReply',kakaoController.messageReply);

module.exports = router;