const router = require('express').Router();
const splatBannerController = require('./splat_banner_controller');

router.post('/',splatBannerController.insertReceipt);


module.exports = router;