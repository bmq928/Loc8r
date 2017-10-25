var mongoose = require("mongoose");
var localStrategy = require("passport-local").Strategy;
var passport = require("passport");
var User = mongoose.model("user");

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (username, password, done) {
    // console.log("username : " + username);
    // console.log("password : " + password);
    User.findOne({ 'email' : username }, function (err, user) {
        // console.log("inside")
        if (err) return done(err);
        if (!user) return done(null, false, {
            message: "Incorect username"
        });
        if (!user.validPassword(password)) return done(null, false, {
            message: "Incorect password"
        });
        return done(null, user);
    })
}));