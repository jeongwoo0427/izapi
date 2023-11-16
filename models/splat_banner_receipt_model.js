const Sequelize = require('sequelize');

module.exports = class SplatBannerReceiptModel extends Sequelize.Model {

    static MN = 'SplatBannerReceiptModel';
    static TN = 'splat_banner_receipt';
    static CN = {
        receiptNo : 'receiptNo',
        bannerNo : 'bannerNo',
        badge1No : 'badge1No',
        badge2No : 'badge2No',
        badge3No : 'badge3No',
        nickname : 'nickname',
        tag : 'tag',
        motto : 'motto',
        fontColor : 'fontColor',
        fontSizeRatio : 'fontSizeRatio',
        badgeSizeRatio : 'badgeSizeRatio'
    }

    static init(sequelize) {
        const CN = this.CN;
        return super.init({
            [CN.receiptNo]: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            [CN.bannerNo]: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            [CN.badge1No]: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            [CN.badge2No]: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            [CN.badge3No]: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            [CN.nickname] : {
                type: Sequelize.STRING(30),
                allowNull: false,
            },
            [CN.tag]: {
                type: Sequelize.STRING(30),
                allowNull: false
            },
            [CN.motto]: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            [CN.fontColor]: {
                type: Sequelize.INTEGER.UNSIGNED, //부호가 양수만 존재한다면 Unsigned
                allowNull: false
            },
            [CN.fontSizeRatio] : {
                type: Sequelize.DOUBLE,
                allowNull : false,
            },
            [CN.badgeSizeRatio] : {
                type: Sequelize.DOUBLE,
                allowNull : false,
            }
        }, { 
            sequelize,  // static init 메서드의 매개변수와 연결되는 옵션
            timestamps: true, // createdAt, updatedAt 컬럼 추가 여부
            underscored: false, //false: 테이블명이 기본 카멜케이스, true: 테이블명이 기본 스네이크케이스
            modelName: this.MN, 
            tableName: this.TN, //실제 DB상의 테이블명
            paranoid: true, //deletedAt컬럼 생성여부 
            charset: 'utf8', 
            collate: 'utf8_general_ci' 
        });
    }

    static associate(db){}
};