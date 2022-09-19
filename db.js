const Sequelize = require('sequelize');

const sequelize = new Sequelize('iblogger_node', 'dbadmin', '123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
});
sequelize.authenticate()
    .then(() => {
        console.log('database connected.')
    })
    .catch(err => {
        console.log(err);
    })

module.exports = db = {};
db.sequelize = sequelize;
//import models here which needs to be created in db.
db.Employee = require("./models/user")
sequelize.sync()