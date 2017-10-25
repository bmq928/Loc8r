var express = require("express");
var router = express.Router();
var locationCtrl = require("../controllers/locationCtrl");
var authenticationCtrl = require("../controllers/authentication");
var jsonWebToken = require("jsonwebtoken");
var jwt = require("express-jwt");
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

router.get('/getAll', locationCtrl.getAll);
router.get('/getById/:id', locationCtrl.getById);

router.post('/addReview', auth, function (req, res) {
    console.log(req.payload);
    locationCtrl.addReview(req, res);
});

// function myMiddleWare(req, res, next){
    
//     console.log(req);
//     next();
// }

router.post('/register', authenticationCtrl.register);
router.post("/login", authenticationCtrl.login);

module.exports = router;