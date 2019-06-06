const Sequelize = require('sequelize') ;
const env = process.env.NODE_ENV || 'development' ;
const config = require('../config/config')[env];
const db = {} ;

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
) ;

db.sequelize = sequelize ;
db.Sequelize = Sequelize ;

//다대다 관계
db.User = require('./user')(sequelize, Sequelize) ;
db.Post  = require('./post')(sequelize, Sequelize) ;
db.Hashtag = require('./hashtag')(sequelize, Sequelize); ;

//해시태그
db.User.hasMany(db.Post) ;
db.Post.belongsTo(db.User) ;

db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }) ;
db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag' }) ;

//팔로우관계
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'followingId' }) ;
db.User.belongsToMany(db.User, { through: 'Follow', as: 'Following', foreignKey: 'followerId' }) ; //유명한 사람

db.User.belongsToMany(db.Post, { through: 'Like'}) ;
db.Post.belongsToMany(db.User, { through: 'Like'}) ;

module.exports = db ;