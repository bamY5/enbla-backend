const express = require("express");
const { search } = require("../controller/search");
const router = express.Router();

router.post("/", search);

module.exports = router;
