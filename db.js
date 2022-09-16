const Sequelize = require('sequelize');

const sequelize = new Sequelize('iblogger_node', 'dbadmin', '123', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,

    // pool: {
    //     max: 5,
    //     min: 0,
    //     idle: 10000
    // }
});
sequelize.authenticate()
    .then(() => {
        console.log('database connected.')
    })
    .catch(err => {
        console.log(err);
    })

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync({
    force: true
})
    .then(() => {
        console.log("database has been synced")
    })

module.exports = db;