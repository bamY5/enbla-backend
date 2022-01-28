const express = require('express')
const router = express.Router()
const userController = require('../controller/user')


router.route('/').get(userController.getUser)

router.route('/').post(userController.createUser)



module.exports = router