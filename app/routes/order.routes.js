const express = require('express');
const Order = require('../database/models/Order');
const OrderLine = require('../database/models/OrderLine');

const router = express.Router();

router.get("/list", async (req, res) => {
    const userId = req.userId;

    const orders = await Order.findAll({ 
        where: { 
            userId: userId 
        },
        include: [
            {
                model: OrderLine,
                as: "orderLines"
            }
        ]
    });

    res.status(200).json({ data: { orders: orders} });
})

router.post("/create", async (req, res) => {
    const apiFields = [
        {
            key: "productId",
            label: "Product ID"
        },
        {
            key: "productTitle",
            label: "Product Title"
        },
        {
            key: "productDescription",
            label: "Product Description"
        },
        {
            key: "unitPrice",
            label: "Unit Price"
        },
        {
            key: "quantity",
            label: "Quantity"
        }
    ]

    const orderLines = req.body.orderLines;

    if (!orderLines || orderLines.length === 0) {
        return res.status(400).json({ errorMessage: "No order lines provided!" })
    }

    for (const orderLine of orderLines) {
        for (const field of apiFields) {
            if(!orderLine[field.key]){
                return res.status(400).json({ errorMessage: `${field.label} is mandatory!` });
            }
        }
    }
    
    const order = await Order.create({
        productNo: orderLines.length,
        userId: req.userId,
        totalPrice: orderLines.reduce((sum, item) => sum + item.unitPrice, 0),
        currencyId: "USD"
    });

    let lineNo = 1;
    for (const orderLine of orderLines) {
        await OrderLine.create({
            orderId: order.dataValues.id,
            lineNo: lineNo,
            productId: orderLine.productId,
            productTitle: orderLine.productTitle,
            productDescription: orderLine.productDescription,
            unitPrice: orderLine.unitPrice,
            quantity: orderLine.quantity,
            currencyId: "USD"
        });

        lineNo++;
    }

    const returnOrder = await Order.findByPk(order.dataValues.id, { include: [{ model: OrderLine, as: "orderLines" }] });

    res.status(201).json({ data: { order: returnOrder} });
})

router.delete("/:id", async (req, res) => {
    const userId = req.userId;
    const orderId = req.params.id;
    
    const order = await Order.findByPk(orderId);

    if (!order) {
        res.status(400).json({ errorMessage: "Order not found!" });
    }

    if (order.dataValues.userId !== userId) {
        return res.status(400).json({ errorMessage: "User ID missmatch!" })
    }

    await order.destroy();

    res.status(200).json({ data: {} });
})

Order.hasMany(OrderLine, { foreignKey: "orderId", as: "orderLines" });

module.exports = router;