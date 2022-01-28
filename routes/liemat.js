const express = require("express");
const router = express.Router();
const liematController = require("../controller/liemat")

router.route('/:id').get(liematController.getLiemat)
// router.route('/').get()
router.route('/:creatorId').get()
router.route('/place').get()
router.route('/:joinerId').get()


router.route('/').post(liematController.createLiemat)

//add joiner to liemat
router.route('/:joinerId').put()

//edit liemat 
router.route('/:id').put()

//remove joiner from liemat
router.route('/:joinerId').put()

//delete liemat
router.route('/:id').delete()
















module.exports = router;
