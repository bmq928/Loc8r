require("../models/user");
var User = require("mongoose").model('user');
require("jsonwebtoken");
var sendJson = function(res, status, content){
    res.status(status);
    res.json(content);
}


module.exports.sendJson = sendJson;

//for authentication
//use it with auth in router will authenticate and authorize the api
//the call back pass by the user ' name so we can use this in authenticated api method
module.exports.getAuthor = function(req, res, callback){
    
    console.log("into get author");
    if(req.payload && req.payload.email){
        User
            .findOne({'email' : req.payload.email })
            .exec(function(err, user){
                if(err) sendJson(res, 400, err);
                else if(!user) sendJson(res, 404, {message : "user not found"});
                else callback(req, res, user.name);
            })
    } else {
        sendJson(res, 404, {message : "user not found"});
    }
    
}