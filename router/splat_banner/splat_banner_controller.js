const SplatBannerReceiptModel = require('../../models/splat_banner_receipt_model');

module.exports = {
    insertReceipt : async (req,res,next) =>{
        try{
            const result = await SplatBannerReceiptModel.create(req.body);
            return res.send(result);
        }catch(err){
            return next(err);
        }
    }
}