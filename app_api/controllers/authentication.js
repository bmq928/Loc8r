require("../models/user");
var passport = require("passport");
var mongoose = require("mongoose");
var User = mongoose.model("user");
var sendJson = require("./_shareFunction").sendJson;

module.exports.register = function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password)
        sendJson(res, 400, { message: "all field is required" });
    else {

        var newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        // console.log("pass" + req.body.password)
        newUser.setPassword(req.body.password);

        newUser.save(function (err) {
            if (err) sendJson(res, 400, err);
            else {
                var token = newUser.generateJwt();
                sendJson(res, 201, { token: token })
            }
        });
    }
}

module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        sendJson(res, 400, {message : "all fields are required"});
        return ;
    }

    passport.authenticate('local', function(err, user, info){
        if(err) {
            // console.log(err);
            sendJson(res, 404, err);
        }
        if(user) {
            var token = user.generateJwt();
            sendJson(res, 200, {token : token});
        } else {    
            sendJson(res, 401, info);
        }
    })(req, res);

}
