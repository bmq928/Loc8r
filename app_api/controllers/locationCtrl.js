require("../models/location");
var Location = require("mongoose").model("location");
var sendJson = require("./_shareFunction").sendJson;
var getAuthor = require("./_shareFunction").getAuthor;

var newAverageStar = function (curAverage, length, rating) {
    let result = (curAverage * (length - 1) + parseInt(rating)) / length;
    // console.log("rating " + rating);
    // console.log("result " + result);
    // console.log("length " + length);

    console.log("b1 " + (length - 1));
    console.log("b2 " + curAverage * (length - 1));
    console.log("vai (9 + 5) = 95 b3 " + (curAverage * (length - 1) + rating) ) ;
    console.log("b4 " + (curAverage * (length - 1) + rating) / length);




    return result;
};

// if (process.env.NODE_ENV === "production") apiOption.server = "nah";

module.exports.getAll = function (req, res) {
    Location.find({}, function (err, locations) {
        if (err) sendJson(res, 400, err);
        else sendJson(res, 200, locations);
    })
}

module.exports.getById = function (req, res) {
    Location.findById(req.params.id, function (err, location) {
        if (err) sendJson(res, 400, err);
        else sendJson(res, 200, location);
        // else sendJson(res, 404, { message: "not found" }); // 
    })
}


module.exports.addReview = function (req, res) {
    console.log("add-review");
    getAuthor(req, res, function (req, res, username) {
        console.log("get into get author");
        Location
            .findById(req.body.id, function (err, loc) {
                console.log("find by id");
                if (err) sendJson(res, 400, err);
                else if (!loc) sendJson(res, 404, { message: "not found" })
            })
            .exec(function (err, loc) {
                console.log("get into exec");
                if (err) sendJson(res, 400, err);
                else if (loc) {
                    let newComment = {
                        author: username,
                        rating: req.body.rating,
                        reviewText: req.body.reviewText,
                        createOn: req.body.createOn
                    };
                    loc.reviews.push(newComment);
                    // loc.set({averageRating : newAverageStar(loc, newComment.rating)});
                    loc.averageRating = newAverageStar(loc.averageRating, loc.reviews.length, newComment.rating);
                    loc.save(function (err, updateLoc) {
                        if (err) sendJson(res, 400, err);
                        else sendJson(res, 201, updateLoc);
                    });
                    // sendJson(res, 201, loc);
                }
            });
    })

    // console.log("get into get author");
    // Location
    //     .findById(req.body.id, function (err, loc) {
    //         if (err) sendJson(res, 400, err);
    //         else if (!loc) sendJson(res, 404, { message: "not found" })
    //     })
    //     .exec(function (err, loc) {
    //         console.log("get into exec");
    //         if (err) sendJson(res, 400, err);
    //         else if (loc) {
    //             let newComment = {
    //                 author: username,
    //                 rating: req.body.rating,
    //                 reviewText: req.body.reviewText,
    //                 createOn: req.body.createOn
    //             };
    //             loc.reviews.push(newComment);

    //             loc.save(function (err) {
    //                 if (err) console.log('err ' + err);
    //             });
    //             sendJson(res, 201, loc);
    //         }
    //     })
}

