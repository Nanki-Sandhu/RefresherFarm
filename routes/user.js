const express = require("express");
const router = express.Router();
const { saveRedirectUrl } = require("../middleware.js");
const passport = require("passport");
const WrapAsync = require("../utils/WrapAsync.js");
const userController = require("../controllers/user.js");

router.route("/signup").get(userController.renderSignup)
    .post(WrapAsync(userController.signup)
    );

router.route("/login").get(userController.renderLogin)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.login);;

router.get("/logout", userController.logout);

module.exports = router;