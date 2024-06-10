const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./blogs-routes");
const commentRoutes = require("./comment-routes");

// Set up the routes
router.use("/users", userRoutes); // Routes for user-related functionality
router.use("/blogs", postRoutes); // Routes for post-related functionality
router.use("/comments", commentRoutes); // Routes for comment-related functionality

// Export the router
module.exports = router;