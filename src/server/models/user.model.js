const mongoose = require("mongoose");
const { user } = require(".");
const Role = require("./role.model");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: {
    type: String,
    default: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs/123907218/original/fccdc48c5d7e319ae32d19898d11182290c3021d/create-cyberpunk-and-superhero-style-illustration-for-you.jpg'
  },
  about: {
    type: String,
    default: function() {
      return this.username + "'s about information."
    }
  },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  articles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
    }
  ],
  favoriteArticles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article"
    }
  ],
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    }
  ]
})

const User = mongoose.model(
  "User",
  userSchema
);

module.exports = User;