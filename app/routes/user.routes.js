const express = require('express');
const User = require("../database/models/User");
const Order = require('../database/models/Order');

const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
        return res.status(400).json({ errorMessage: "User ID is not valid!" })
    }

    if (id !== req.userId) {
        return res.status(400).json({ errorMessage: "User ID missmatch!" })
    }

    const user = await User.findByPk(id, {
        attributes: {
            exclude: ["password", "id"]
        }
    });

    if (!user) {
        return res.status(400).json({ errorMessage: "User not found!" })
    }

    res.status(200).json({ data: user })
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
        return res.status(400).json({ errorMessage: "User ID is not valid!" })
    }

    if (id !== req.userId) {
        return res.status(400).json({ errorMessage: "User ID missmatch!" })
    }

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(400).json({ errorMessage: "User not found!" })
    }

    const updatedUser = await user.update({
        ...req.body
    })

    delete updatedUser.dataValues.password;

    res.status(200).json({ data: updatedUser });
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
        return res.status(400).json({ errorMessage: "User ID is not valid!" })
    }

    if (id !== req.userId) {
        return res.status(400).json({ errorMessage: "User ID missmatch!" })
    }

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(400).json({ errorMessage: "User not found!" })
    }

    await Order.destroy({ where: { userId: user.id } });

    await user.destroy();

    res.status(200).json({ data: {} });
})

module.exports = router;