const express = require("express");
const router = express.Router();
const liematController = require("../controller/liemat")
const { authorize } = require('../middleware/authorize')


router.get('/',liematController.getLiemat)
router.get('/:id',liematController.getLiematById)
router.get('/:creatorId',liematController.getByCreator)
// router.get('/place')



router.post('/',authorize ,liematController.createLiemat)

//add joiner to liemat
router.put('/join-liemat/:id',authorize,liematController.joinLiemat)

// leave liemat
router.put('/leave-liemat/:id',authorize, liematController.leaveLieamt);
// //delete liemat
router.delete('/:id',authorize, liematController.deleteLiemat)
















module.exports = router;
