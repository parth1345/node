var db = require('../db'),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

var Blog = sequelize.define('random', {
    title: Sequelize.STRING,
    content: Sequelize.STRING
});

module.exports = Blog;