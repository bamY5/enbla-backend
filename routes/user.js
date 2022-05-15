const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/authorize");
const { getUser, updateUser, uploadProfile } = require("../controller/user");

router.get("/:id", getUser);

router.put("/:id", authorize, updateUser);

router.put("/profile/:id", authorize, uploadProfile);

module.exports = router;
