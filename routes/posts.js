const express = require("express");
const router = express.Router();
const multer = require("multer");
const postController = require("../controllers/postController");
// const auth = require("../middlewares/auth");

// Multer config START * Needs refactor *
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/posts");
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname;
    fileName = Date.now() + ".jpg";
    cb(null, fileName);
  },
});

function fileFilter(req, file, cb) {
  const type = file.mimetype;
  if (type == "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ dest: "./", storage, fileFilter });
// Multer config END

router.get("/followers/:id/:page/:limit", postController.fetchTimeline);
router.get("/:id", postController.fetchSinglePost);
router.get("/profile/:id", postController.fetchProfilePosts);
router.post("/new", upload.single("postImage"), postController.newPost);
router.put("/:type/:id", postController.handleLike);

module.exports = router;
