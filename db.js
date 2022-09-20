const Sequelize = require('sequelize');

const sequelize = new Sequelize('iblogger_node', 'dbadmin', '123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
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
db.Blog = require("./models/blog")
sequelize.sync(
    //comment out below line when database needs to be updated forcefully
    // { force: true }
)
    .then(() => {
        console.log("database has been synced")
    })