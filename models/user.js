var db = require('../db'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

var User = sequelize.define('random', {
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING
});

module.exports = User;