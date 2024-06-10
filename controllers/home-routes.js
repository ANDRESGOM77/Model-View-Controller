const router = require("express").Router();
const { blog, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// Route to render homepage
router.get("/", async (req, res) => {
  try {
        // Find all blogs with associated usernames
    const blogData = await blog.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    // Convert blog data to plain JavaScript object
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    // Render homepage template with blogs and login status
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
        // If there is an error, return 500 status code and error message
    res.status(500).json(err);
  }
});
// Route to render individual blog page
router.get("/blog/:id", withAuth, async (req, res) => {
  try {
        // Find blog by ID with associated username and comments with associated usernames
    const blogData = await blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });
    // Convert blog data to plain JavaScript object
    const blog = blogData.get({ plain: true });
    // Render blog template with blog data and login status
    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
        // If there is an error, return 500 status code and error message
    res.status(500).json(err);
  }
});
// Route to render dashboard page with all blogs by current user
// Find all blogs by current user with associated usernames
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const blogData = await blog.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ["username"] }],
    });
    // Convert blog data to plain JavaScript object
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("dashboard", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup");
});

//render the new blog page
router.get("/newblog", (req, res) => {
  if (req.session.logged_in) {
    res.render("newblog");
    return;
  }
  res.redirect("/login");
});

//render the edit blog page
router.get("/editblog/:id", async (req, res) => {
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

    const blog = blogData.get({ plain: true });

    res.render("editblog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// module exports router
module.exports = router;