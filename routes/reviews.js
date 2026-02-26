const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js')
const expressErrors = require('../utils/expressErrors.js');
const {reviewSchema} = require("../schema.js");
const Listing = require("../Models/Listing.js");
const Review = require("../Models/reviews.js");
const {validateReview, isLoggedIn,isReviewauthor} = require("../middleware.js")
const reviewsController = require("../controllers/reviews.js")

//Reviews
//Post route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewsController.createReview) );

// Delete Review route
router.delete("/:reviewId",isLoggedIn,isReviewauthor, wrapAsync(reviewsController.destroyRoute))

module.exports = router;