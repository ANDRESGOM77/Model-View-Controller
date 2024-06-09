const { Comment } = require("../models");

const commentSeed = [
  {
    comment_text: "Great article!",
    user_id: 1,
    post_id: 1,
  },
  {
    comment_text: "I agree with you!",
    user_id: 2,
    post_id: 1,
  },
  {
    comment_text: "I disagree with you!",
    user_id: 3,
    post_id: 1,
  },
]

const seedComments = () => Comment.bulkCreate(commentSeed);

module.exports = seedComments;