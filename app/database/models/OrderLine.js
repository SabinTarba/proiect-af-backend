const { sequelize } = require("../sqlite/server");
const { DataTypes } = require('sequelize');

const OrderLine = sequelize.define('OrderLine', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    orderId: {
        type: DataTypes.UUIDV4,
        allowNull: false
    },
    lineNo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    productDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currencyId: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = OrderLine;