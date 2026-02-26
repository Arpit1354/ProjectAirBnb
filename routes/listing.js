const express = require("express")
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync.js')
const {listingSchema, reviewSchema} = require("../schema.js");
const expressErrors = require('../utils/expressErrors.js');
const Listing = require("../Models/Listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js")
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });



router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );
// .post(),(req,res)=>{
// res.send(req.file);
// })

router.get("/new",isLoggedIn,listingController.rendernewForm);

router.route("/:id").get(wrapAsync(listingController.newListing))
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyRoute)
)

router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm))




module.exports = router;