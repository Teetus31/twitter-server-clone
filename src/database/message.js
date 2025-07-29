const sequelize = require('sequelize')

module.exports = {
    content: {
        type:sequelize.STRING,
        unique: true,
        primaryKey: true
    },

    username: {
        type: sequelize.STRING,
        allowNull: false,
    }
}
