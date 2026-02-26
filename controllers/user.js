const Listing = require("../Models/Listing.js");
const user = require("../Models/user")

module.exports.renderSignupForm =(req,res)=>{
     res.render("users/signup");
}

module.exports.signup =(async(req,res)=>{
     let {username, email, password}=req.body;
     try{
 let newUser =  new user({email, username});
     let registerUser =  await user.register(newUser,password);
     res.redirect("/listings")
     }
     catch(e){
          req.flash("error",e.message);
         return res.redirect("/user/signup")

     }
})
module.exports.renderLoginForm = (req,res)=>{
     res.render("users/login");
}
module.exports.login = (req, res) => {
        req.flash("success", "Welcome back!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    };
    module.exports.logout = (req,res)=>{
     req.logout(function(err){
          if(err){
          return next(err);
          }
          req.flash("error","You are logged out!");
          res.redirect("/listings")
     })
}