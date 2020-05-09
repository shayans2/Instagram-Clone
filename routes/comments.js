const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.get("/posts/:id", commentController.fetchComment);
router.post("/new", commentController.new);

module.exports = router;
