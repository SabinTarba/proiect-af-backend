const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../database/models/User");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
        return res.status(400).json({ errorMessage: "User ID is not valid!" })
    }

    const user = await User.findByPk(id, {
        attributes: {
            exclude: ["password", "id"]
        }
    });

    if (!user) {
        return res.status(400).json({ errorMessage: "User not found!" })
    }

    res.status(200).json({success: true, data: user})
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;

    if (!isNaN(id)) {
        return res.status(400).json({ errorMessage: "User ID is not valid!" })
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

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(400).json({ errorMessage: "User not found!" })
    }

    await user.destroy();

    // TO DO: to implement deletion of user's orders (or archive them before actually delete them)

    res.status(200).json({ data: {} });
})

module.exports = router;