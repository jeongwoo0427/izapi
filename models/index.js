const Sequelize = require('sequelize');
const SplatBannerReceiptModel = require('../models/splat_banner_receipt_model');
const ChatMessageModel = require('../models/chat_message_model');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/db_config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database,config.username,config.password,config);

db.sequelize = sequelize;

db.SplatBannerReceiptModel = SplatBannerReceiptModel;
db.chatMessageModel = ChatMessageModel;

SplatBannerReceiptModel.init(sequelize);
ChatMessageModel.init(sequelize);


module.exports = db;