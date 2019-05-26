module.exports = (sequelize, Sequelize) => {
    return sequelize.define('wallet', {
        money : {
            type: Sequelize.INTEGER,
            allowNull: false,
            comment: '금액',
        },
        desc: {
            type: Sequelize.STRING(100),
            allowNull: false,
            comment: '설명',
        },
        type: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            comment: 'TRYE면 수입 / FALSE면 지출',
        },
    }, {
        timestamps: true, //생성일과 row수정일이 자동으로 기록
        paranoid: true //삭제일가지 기록
    })
} ;