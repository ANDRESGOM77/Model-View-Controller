const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./blogs-routes");
const commentRoutes = require("./comment-routes");

// Set up the routes
router.use("/users", userRoutes); 
router.use("/blogs", postRoutes); 
router.use("/comments", commentRoutes); 

// Export the router
module.exports = router;