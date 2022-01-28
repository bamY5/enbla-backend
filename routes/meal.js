const express = require("express")
const router = express.Router()
const mealController = require('../controller/meal')

router.route('/').get(mealController.getMeal)
router.route('/:id').get()

router.route('/').post(mealController.createMeal)
router.route('/').put()

router.route('/').delete()



module.exports = router