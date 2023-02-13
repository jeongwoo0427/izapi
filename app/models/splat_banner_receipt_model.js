const Sequelize = require('sequelize');

module.exports = class SplatBannerReceiptModel extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            receiptNo: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            bannerNo: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            badge1No: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            nickname : {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            tag: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            motto: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            fontColor: {
                type: Sequelize.INTEGER.UNSIGNED, //부호가 양수만 존재한다면 Unsigned
                allowNull: false
            },
            fontSizeRatio : {
                type: Sequelize.DOUBLE,
                allowNull : false,
            },
            badgeSizeRatio : {
                type: Sequelize.DOUBLE,
                allowNull : false,
            }
        }, { 
            sequelize,  // static init 메서드의 매개변수와 연결되는 옵션
            timestamps: true, // createdAt, updatedAt 컬럼 추가 여부
            underscored: false, //false: 테이블명이 기본 카멜케이스, true: 테이블명이 기본 스네이크케이스
            modelName: 'SplatBannerReceiptModel', 
            tableName: 'splat_banner_receipt', //실제 DB상의 테이블명
            paranoid: true, //deletedAt컬럼 생성여부 
            charset: 'utf8', 
            collate: 'utf8_general_ci' 
        });
    }

    static associate(db){}
};