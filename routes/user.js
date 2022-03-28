const express = require('express')
const router = express.Router()
const {authorize} = require('../middleware/authorize')
const {
    getUser,
    updateUser
} = require('../controller/user')


router.get('/:id',getUser)

router.put('/:id',authorize,updateUser)



module.exports = router