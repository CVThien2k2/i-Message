const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");

router.post("/", messageController.create);
router.get("/:group_id", messageController.getMessage);

module.exports = router;
