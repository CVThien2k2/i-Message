const express = require('express')
const router = express.router

const User = require('../models/user.model')

router.get('/user', (req, res) =>
    res.send("hello"))

    