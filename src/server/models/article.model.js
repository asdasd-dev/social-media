const mongoose = require("mongoose");

const Article = mongoose.model(
  "Article",
  new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    date: Date,
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
    }]
  })
);

module.exports = Article;