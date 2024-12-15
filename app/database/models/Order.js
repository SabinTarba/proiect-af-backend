const { sequelize } = require("../sqlite/server");
const { DataTypes } = require('sequelize');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    productNo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    currencyId: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Order;