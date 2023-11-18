const Sequelize = require('sequelize');

module.exports = class ChatMessageModel extends Sequelize.Model {

    static MN = 'ChatMessageModel';
    static TN = 'chat_message';
    static CN = {
        uuid : 'uuid',
        roomCode : 'roomCode',
        type : 'type',
        content : 'content',
        userId : 'userId',
        userName : 'userName',
    }

    static init(sequelize) {
        const CN = this.CN;
        return super.init({
            [CN.uuid]: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            [CN.roomCode]: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            [CN.type] : {
                type: Sequelize.STRING,
                allowNull : false,
            },
            [CN.content] : {
                type: Sequelize.STRING(500),
                allowNull : false,
            },
            [CN.userId] : {
                type: Sequelize.STRING,
                allowNull : false,
            },
            [CN.userName] : {
                type: Sequelize.STRING,
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