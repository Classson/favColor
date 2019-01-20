const Sequelize = require('sequelize');
const db = new Sequelize("postgres://localhost:5432/colordb", {
  logging: false
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  }
})



module.exports = {
  db, User
};
