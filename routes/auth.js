const express = require('express')
const { model } = require('mongoose')
const router = express.Router()
const User = require('../model/userModel')
const authController = require('../controller/auth')


router.post('/signin', authController.signin)

router.post('/register', authController.register)

module.exports = router
