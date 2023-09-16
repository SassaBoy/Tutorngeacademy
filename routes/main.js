const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const courseController = require("../controllers/course");
const newsController = require("../controllers/news");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.post("/course", ensureAuth, courseController.createCourse);
router.post("/posts", ensureAuth, postsController.createPost);
router.post("/posts", ensureAuth, postsController.createPost);


module.exports = router;
