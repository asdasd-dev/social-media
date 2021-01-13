const db = require("../models");

const Tag = db.tag;

exports.getTags = function(req, res) {
    Tag.find({}).select('-articles').exec((err, tags) => {
        if (err) {
            console.log('error getting tags');
            res.status(500).send();
            return;
        }
        
        res.status(200).send(tags.map(tag => tag.toObject().name));
    })
}