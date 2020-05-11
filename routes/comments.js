const express = require("express");
const router = express.Router();
const CommentService = require("../services/commentService");
const auth = require("../middlewares/auth");
const validateObjectId = require("../middlewares/validateObjectId");

router.get("/posts/:id", validateObjectId, CommentService.fetchComment);
router.post("/new", auth, CommentService.new);

module.exports = router;
