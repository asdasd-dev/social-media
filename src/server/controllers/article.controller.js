const { ObjectId } = require("mongodb");
const { article } = require("../models");
const db = require("../models");

const User = db.user;
const Article = db.article;
const Tag = db.tag;

exports.allArticles = (req, res) => {
    Article.find({}).populate('tags').populate('author', 'username avatar -_id').exec((err, articles) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!articles.length) {
            res.status(204).send({ message: 'Sorry, there are no articles at the moment!' });
            return;
        }

        articles = articles.map(articleDoc => {
            let returnArticle = articleDoc.toObject();
            console.log('tags: ', returnArticle.tags);
            returnArticle.tags = returnArticle.tags.map(tag => tag.name);
            returnArticle.id = returnArticle._id;
            return returnArticle;
        });

        res.status(200).send(articles)
    })
};

exports.postArticle = (req, res) => {
    const article = new Article({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        author: req.userId,
        favorite: []
    });

    // create promise for each tag resolving id of found 
    // or newly created tag from database
    let promises = req.body.tags.map(tag => {
        return new Promise((resolve, reject) => {
            Tag.findOne({ name: tag }, function (err, doc) {
                if (err) {
                    reject(err);
                    return;
                }

                if (!doc) {
                    let newTag = new Tag({ name: tag, articles: [article._id] });
                    newTag.save();
                    resolve(newTag._id);
                    return;
                }

                resolve(doc._id);
            }).exec();
        });
    });

    Promise.all(promises).then(tagIds => {
        article.tags = tagIds
        article.save((err, createdArticle) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            res.status(200).send({ message: 'Article successfully created!' });
        })
    }).catch(err => console.log(err));
}