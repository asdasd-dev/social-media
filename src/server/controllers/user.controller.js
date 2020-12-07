const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.allUsers = (req, res) => {
    User.find({}, 'username avatar -_id').exec().then(result => {
        res.status(200).send(result);
    })
}

exports.userPublicInfo = (req, res) => {
    User.findOne({ username: req.params.username }).populate('followers following articles favoriteArticles').exec((err, doc) => {
        if (err) {
            res.status(500).send();
            return;
        }

        if (!doc) {
            res.status(404).send();
            return;
        }
        
        return res.status(200).send({
            username: doc.username,
            avatar: doc.avatar,
            about: doc.about
        })
    });
}

exports.updateUser = (req, res) => {
    if (req.body.password)
        req.body.password = bcrypt.hashSync(req.body.password, 8)
    User.findOneAndUpdate({ '_id': req.userId }, req.body, { new: true },
        (err, doc) => {
            if (err) {
                res.status(500).send();
                return;
            }
        
            if (!doc) {
                res.status(400).send();
                return;
            }
        
            res.status(200).send({
                email: doc.email, 
                avatar: doc.avatar, 
                about: doc.about, 
            });
        }
);
}