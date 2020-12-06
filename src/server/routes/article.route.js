const authJwt = require("../middleware/authJwt");
const { article } = require("../models");
const controller = require("../controllers/article.controller")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/articles", controller.allArticles);

  app.get("/api/article/:articleId");

  app.post("/api/article", [authJwt.verifyToken], controller.postArticle); 
};