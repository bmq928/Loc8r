var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    hash: String,
    salt: String
}, { collection: "user" });

UserSchema.methods.setPassword = function (password) {
    // console.log("1");
    this.salt = crypto.randomBytes(16).toString("hex");
    // console.log("2");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, null).toString('hex');
    // console.log("3");
}

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, null).toString('hex');
    return this.hash === hash;
}

UserSchema.methods.generateJwt = function () {
    var expireDay = new Date();
    expireDay.setDate(expireDay.getDate() + 7);

    // console.log("generate !!");

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expireDay.getTime() / 1000)
    }, process.env.JWT_SECRET);
}
mongoose.model("user", UserSchema)