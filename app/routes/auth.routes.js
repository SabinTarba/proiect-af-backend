const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../database/models/User');

const router = express.Router();

router.post('/login', async (req, res) => {

    const apiFields = [
        {
            key: "email",
            label: "Email"
        },
        {
            key: "password",
            label: "Password"
        }
    ]

    for (field of apiFields) {
        if(!req.body[field.key]){
            return res.status(400).json({ errorMessage: `${field.label} is mandatory!` });
        }
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({
        where: {
            email
        }
    });

    if (!existingUser) {
        return res.status(400).json({ errorMessage: 'User not found!' });
    }

    const isValidPassword = bcrypt.compareSync(password, existingUser.dataValues.password);

    if (!isValidPassword) {
        return res.status(400).json({ errorMessage: 'Invalid password!' });
    }

    const token = jwt.sign({id: existingUser.dataValues.id}, process.env.TOKEN_SECRET, {
        expiresIn: '1h'
    })

    res.status(200).json({ data: { token: token} });
})

router.post("/register", async (req, res) => {

    const apiFields = [
        {
            key: "email",
            label: "Email"
        },
        {
            key: "email",
            label: "Email"
        },
        {
            key: "password",
            label: "Password"
        },
        {
            key: "firstName",
            label: "First name"
        },
        {
            key: "lastName",
            label: "Last name"
        },
        {
            key: "address",
            label: "Address"
        }
    ];

    for (field of apiFields) {
        if(!req.body[field.key]){
            return res.status(400).json({ errorMessage: `${field.label} is mandatory!` });
        }
    }

    const email = req.body.email;

    const existingUser = await User.findOne({
        where: {
            email: email
        }
    });

    if(existingUser) {
        return res.status(400).json({ errorMessage: `User with email ${email} already exists!` });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const user = await User.create({
        ...req.body,
        password: hashedPassword
    })

    delete user.dataValues.password;
    delete user.dataValues.id;

    res.status(201).json({ data: user });
})

module.exports = router;