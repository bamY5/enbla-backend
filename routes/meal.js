const express = require("express");
const router = express.Router();

router.route('/getMeals/').get()
router.route('/getMeals/:id').get()
router.route('/getMeals/:creatorId').get()
router.route('/getMeals/place').get()
router.route('/getMeals/:joinerId').get()


router.route('/postMeals').post()

router.route('/addToMeal/:joinerId').put()
router.route('/editMeal/:id').put()
router.route('removeFromMeal/:joinerId').put()


router.route('/deleteMeal/:id')
















module.exports = router;
