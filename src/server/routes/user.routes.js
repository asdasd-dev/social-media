const express = require('express');
const router = express.Router();

const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/user.controller");

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get("/", controller.allUsers)

router.get("/:username", controller.userPublicInfo);

router.put(
  "/",
  [authJwt.verifyToken],
  controller.updateUser
)

module.exports = router;