
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
  const attributes = {
    player1Id: { type: DataTypes.INTEGER, allowNull: false },
    player2Id: { type: DataTypes.INTEGER, allowNull: false },
    testStartPlayer1: { type: DataTypes.DATE, allowNull: true },
    testStartPlayer2: { type: DataTypes.DATE, allowNull: true },
    testEndPlayer1: { type: DataTypes.DATE, allowNull: true },
    testEndPlayer2: { type: DataTypes.DATE, allowNull: true },
    totalQuestions: { type: DataTypes.INTEGER, allowNull: false },
    testType: {type: DataTypes.STRING, allowNull: false},
    correctAnswersPlayer1: { type: DataTypes.INTEGER, allowNull: true },
    correctAnswersPlayer2: { type: DataTypes.INTEGER, allowNull: true }
  };

//   const options = {
//     defaultScope: {
//       // exclude hash by default
//       attributes: { exclude: ['hash'] }
//     },
//     scopes: {
//       // include hash with this scope
//       withHash: { attributes: {}, }
//     }
//   };

  return sequelize.define('Quiz', attributes);
}
