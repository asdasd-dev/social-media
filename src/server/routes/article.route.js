const express = require('express');
const router = express.Router();

const controller = require("../controllers/article.controller")
const authJwt = require("../middleware/authJwt");

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/", controller.allArticles);

router.get("/:articleId", controller.articleFullInfo);

router.post("/:articleId/comment", [authJwt.verifyToken], controller.postComment)

router.post("/", [authJwt.verifyToken], controller.postArticle);

module.exports = router;