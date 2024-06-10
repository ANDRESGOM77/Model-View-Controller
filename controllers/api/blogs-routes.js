const router = require("express").Router();
const { blog, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
// Get all blogs with associated username
router.get("/", async (req, res) => {
  try {
    const blogData = await blog.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Get one blog by ID with associated username and comments
router.get("/:id", async (req, res) => {
  try {
    const blogData = await blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    if (!blogData) {
      res.status(404).json({ message: "No blog found with that id!" });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Create a new blog with authenticated user
router.blog("/", withAuth, async (req, res) => {
  try {
    const newBlog = await blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});
// Update an existing blog with authenticated user
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedBlog = await blog.update(req.body, {
      where: { id: req.params.id },
    });

    if (!updatedBlog) {
      res.status(404).json({ message: "No blog found with that id!" });
      return;
    }
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Delete a blog with authenticated user
router.delete("/:id", withAuth, async (req, res) => {
  try {
 
    await Comment.destroy({
      where: { blog_id: req.params.id },
    });

    const deletedBlog = await blog.destroy({
      where: { id: req.params.id },
    });

    if (!deletedBlog) {
      res.status(404).json({ message: "No blog found with that id!" });
      return;
    }
    res.status(200).json(deletedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;