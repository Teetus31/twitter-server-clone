const sequelize = require('sequelize');

module.exports = {
    username: {
        type: sequelize.STRING,
        primaryKey: true,
        unique: true,
    },

    password: {
        type: sequelize.STRING,
        unique: false,
    }
}
