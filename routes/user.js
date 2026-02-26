const express = require("express");
const user = require("../Models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const Listing = require("../Models/Listing.js");
const router = express.Router();
const {saveredirectUrl} = require("../middleware.js")
const userController = require("../controllers/user.js")


router.route("/signup").get(userController.renderSignupForm).post(wrapAsync(userController.signup)
);

router.route("/login").get(userController.renderLoginForm).post(
    saveredirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/user/login",
        failureFlash: true
    }), userController.login)

router.get("/logout",userController.logout)


module.exports = router;
