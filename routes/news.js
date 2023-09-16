const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const newsController = require("../controllers/news");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, newsController.getNews);
router.get("/", ensureAuth, newsController.getAllNews);

router.post("/createNews", upload.single("file"), newsController.createNews);

router.delete("/deleteNews/:id", newsController.deleteNews);

module.exports = router;
