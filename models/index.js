const User = require("./userdb");
const blog = require("./blogsdb");
const Comment = require("./commentsdb");

User.hasMany(blog, {
  foreignKey: "user_id", 
});

blog.belongsTo(User, {
  foreignKey: "user_id", 
});

Comment.belongsTo(User, {
  foreignKey: "user_id", 
});

Comment.belongsTo(blog, {
  foreignKey: "blog_id", 
});

blog.hasMany(Comment, {
  foreignKey: "blog_id", 
});

User.hasMany(Comment, {
  foreignKey: "user_id", 
});
// Export the models
module.exports = { User, blog, Comment };