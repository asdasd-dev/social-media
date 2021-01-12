const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  date: {
    type: Date,
    default: Date.now
  },
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  tags: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag"
  }],
  favorite: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  }],
  comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
  }]
})

const Article = mongoose.model(
  "Article",
  articleSchema
);

module.exports = Article;