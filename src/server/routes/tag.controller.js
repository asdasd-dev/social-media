const express = require('express');
const router = express.Router();

const controller = require('../controllers/tag.controller');

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

router.get('/', controller.getTags);

module.exports = router;