const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const courseController = require("../controllers/course");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, courseController.getCourse);
router.get("/", ensureAuth, courseController.getAllPosts);

router.post("/createPost", upload.single("file"), courseController.createCourse);

router.delete("/deletePost/:id", courseController.deleteCourse);

module.exports = router;
