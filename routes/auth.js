const express = require('express')
const { model } = require('mongoose')
const router = express.Router()
const User = require('../model/userModel')
const authController = require('../controller/auth')


router.route('/signin').post(authController.signin)

router.route('/register').post(authController.register)

module.exports = router
