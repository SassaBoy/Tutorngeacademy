const cloudinary = require("../middleware/cloudinary");
const News = require("../models/News");

module.exports = {


  getNews: async (req, res) => {
    try {
      const news = await News.findById(req.params.id);
      res.render("index.ejs", { news: news, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },

  getAllNews: async (req, res) =>{
   try {
    const news = await News.find().sort({_id: -1}).limit(5);
    res.render("index.ejs", {news: news});
   } catch (error) {
    console.log(err);
   }
  },

  createNews: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await News.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        desciption: req.body.desciption,
        createdAt: Date.now,
      });
      console.log("Post has been added!");
      res.redirect("/index");
    } catch (err) {
      console.log(err);
    }
  },

  deleteNews: async (req, res) => {
    try {
      // Find post by id
      let news = await News.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await News.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/index");
    } catch (err) {
      res.redirect("/index");
    }
  },
};
