const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/authorize");
const {
	getUser,
	updateUser,
	uploadProfile,
	followUser,
	unfollowUser,
} = require("../controller/user");

router.get("/:id", getUser);

router.put("/:id", authorize, updateUser);

router.put("/profile/:id", authorize, uploadProfile);

router.put("/follow/:id", authorize, followUser);

router.put("/unfollow/:id", authorize, unfollowUser);

module.exports = router;
