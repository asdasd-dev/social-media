const db = require("../models");

const Article = db.article;
const Comment = db.comment;
const Tag = db.tag;

exports.allArticles = (req, res) => {
    Article.find({})
        .populate('tags')
        .populate('author', 'username avatar -_id')
        .select('-content')
        .exec((err, articles) => {
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
            returnArticle.tags = returnArticle.tags.map(tag => tag.name);
            returnArticle.id = returnArticle._id;
            return returnArticle;
        });

        res.status(200).send(articles)
    })
};

exports.articleFullInfo = (req, res) => {
    Article.findOne({ _id: req.params.articleId })
        .populate('tags', '-articles -__v -_id')
        .populate('author', 'username avatar -_id')
        .populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'author',
                model: 'User',
                select: 'username -_id'
            },
            select: '-article -__v -_id'
        })
        .exec((err, article) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
    
            if (!article) {
                res.status(400).send({ message: 'No such article!' });
                return;
            }

            const returnArticle = article.toObject();
            returnArticle.tags = returnArticle.tags.map(tag => tag.name);
            returnArticle.comments = returnArticle.comments.map(comment => {
                comment.username = comment.author.username;
                delete comment.author;
                return comment;
            })

            res.status(200).send(returnArticle);
        });
}

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

exports.postComment = (req, res) => {
    Article.findOne({ _id: req.params.articleId }, async (err, article) => {
        console.log(req.body);
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (!article) {
            res.status(400).send({ message: 'No such article!' });
            return;
        }

        const comment = new Comment({
            text: req.body.text,
            author: req.userId,
            article: req.params.articleId
        });
        await comment.save();

        console.log(article.toObject());
        console.log(comment.toObject());

        article.comments.push(comment);
        await article.save((err, createdArticle) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            res.status(200).send({ message: 'Comment successfully added!' })
        });
    })
}