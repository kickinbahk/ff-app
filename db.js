  
var Sequelize = require('sequelize');
var env = process.env.NODE_ENV || 'development';
var sequelize;

if (env === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
  })
} else {
  sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    'dialect': 'postgres'
  })
}

var db = {}

db.group = sequelize.import(`${__dirname}/models/group.js`)
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
