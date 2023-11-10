const express = require('express')
const router = express.Router()
const authController = require('../Controllers/auth.controller')

router.post('/create', authController.createUser)
router.get('/',authController.getUser)

module.exports = router;
