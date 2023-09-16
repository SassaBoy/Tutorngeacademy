const cloudinary = require("../middleware/cloudinary");
const Course = require("../models/Course");

module.exports = {

    getCourse: async (req, res) => {
        try {
          const course = await Course.findById(req.params.id);
          res.render("individualCourse.ejs", { course: course, user: req.user });
        } catch (err) {
          console.log(err);
        }
      },
      
      getAllPosts: async (req, res) =>{
    try {
     const course = await Course.find().sort({_id: -1});
     res.render("about.ejs", {course: course, user: req.user});
    } catch (error) {
     console.log(err);
    }
   },
    createCourse: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Course.create({
        title: req.body.coursename,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        duration: req.body.duration,
        courseContent: req.body.content,
        category: req.body.category,
        description: req.body.description,
    
        createdAt: Date.now,

      });
      console.log("Course has been added!");
      res.redirect("/index");
    } catch (err) {
      console.log(err);
    }
  },
  deleteCourse: async (req, res) => {
    try {
      // Find post by id
      let post = await Course.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Course.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/index");
    } catch (err) {
      res.redirect("/index");
    }
  },

};
