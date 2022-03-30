const express = require("express");
const router = express.Router();
const liematController = require("../controller/liemat")
const { authorize } = require('../middleware/authorize')


router.get('/',liematController.getLiemat)
// router.route('/').get()
router.get('/:creatorId')
router.get('/place')
router.get('/:joinerId')


router.post('/',authorize ,liematController.createLiemat)

//add joiner to liemat
router.put('/join-liemat/:id',authorize,liematController.joinLiemat)

//edit liemat 
// router.route('/:id').put()

// //remove joiner from liemat
// router.route('/:joinerId').put()

// //delete liemat
// router.route('/:id').delete()
















module.exports = router;
