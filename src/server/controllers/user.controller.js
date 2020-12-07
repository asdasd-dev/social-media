const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};

exports.allUsers = (req, res) => {
    User.find({}, 'username avatar -_id').exec().then(result => {
        res.status(200).send(result);
    })
}

exports.updateUser = (req, res) => {
    if (req.body.password)
        req.body.password = bcrypt.hashSync(req.body.password, 8)
    User.findOneAndUpdate({ '_id': req.userId }, req.body,
        (err, doc) => {
            if (err) {
                res.status.send(500);
                return;
            }
        
            if (!doc) {
                res.status.send(400);
                return;
            }
        
            res.status(200).send({
                email: req.body.email, 
                avatar: req.body.avatar, 
                about: req.body.about, 
            });
        }
);
}