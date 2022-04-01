const express = require("express");
const router = express.Router();
const mealController = require("../controller/meal");
const { authorize } = require("../middleware/authorize");

router.get("/", mealController.getThread);

router.post("/", authorize, mealController.createThread);

router.put("/:id", authorize, mealController.replyToThread);

module.exports = router;
