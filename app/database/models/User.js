const { sequelize } = require("../sqlite/server");
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        require: true
    },
    password: {
        type: DataTypes.STRING,
        require: true
    },
    firstName: {
        type: DataTypes.STRING,
        require: true
    },
    lastName: {
        type: DataTypes.STRING,
        require: true
    },
    address: {
        type: DataTypes.STRING,
        require: true
    },
})

module.exports = User;