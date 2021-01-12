const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: String,
  date: {
    type: Date,
    default: Date.now
  },
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  article: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
  }
})

const Comment = mongoose.model(
  "Comment",
  commentSchema
);

module.exports = Comment;