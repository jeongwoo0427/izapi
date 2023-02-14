const router = require('express').Router();
const splatBannerController = require('../controller/splat_banner_controller');

router.post('/',splatBannerController.insertReceipt);


module.exports = router;