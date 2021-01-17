
const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {

  const { host, port, user, password, database } = config.database;
  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    host: host,
    dialect: 'mysql'
   });

  // init models and add them to the exported db object
  db.User = require('../users/user.model')(sequelize);
  db.Quiz = require('../quiz/quiz.model')(sequelize);
  db.Quiz.belongsTo(db.User, {foreignKey: 'player1Id', targetKey: 'id'}); 
  db.Quiz.belongsTo(db.User, {foreignKey: 'player2Id', targetKey: 'id'});
  

  // sync all models with database
  await sequelize.sync();
}
