    
module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
      email: {
        type: DataTypes.STRING(40),
        allowNull: true,
        unique: true,
      },
      nick: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      provider: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
    }, {
      timestamps: true,
      paranoid: true,
    })
  );
/* module.exports = ((sequelize, DataType) => (
    sequelize.define('user', {
        email: {
            type: DataTypes.STRING(40),
            allowNull: false, //필수
            unique: true, //겹치는 것 x
        },
        nick: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local',
        },
        snsId: { //카카오로 로그인 했을 때
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    }, {
        timestamps: true, //수정일, row 생성일 기록
        paranoid: true, //삭제일 기록(데이터 복구 가능)

    })
)) ; */