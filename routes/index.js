var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
	res.render("landing");
});


// ==============
//AUTH ROUTES
//===============

//SHOW REGISTER FORMS
router.get("/register", function(req,res){
	res.render("register");
});
//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password,function(err,user){
		if(err){
			req.flash("error",err);
			return res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success", "welcome to SetupCamp " + user.username);
			res.redirect("/campgrounds");
		});
	});
});

//show login form
router.get("/login", function(req, res){
	res.render("login");
});
router.post("/login",passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req,res){
	
});

//logout route
router.get("/logout", function(req,res){
	req.logout();
	req.flash("success", "logged you out!");
	res.redirect("/campgrounds");
});

module.exports = router;  