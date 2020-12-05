const { article } = require("../models");
const db = require("../models");

const User = db.user;
const Article = db.article;
const Tag = db.tag;

exports.allArticles = (req, res) => {
    Article.find({}, (err, articles) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        console.log(articles);

        if (!articles.length) {
            res.status(204).send({ message: 'Sorry, there are no articles at the moment!' });
            return;
        }

        res.status(200).send(articles)
    })
};