//@ts-check
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var daySchema = new Schema({
    value: { type: String, required: true }
});

var openingSchema = new Schema({
    opening: { type: Number, required: true },
    closing: { type: Number, required: true },
    closed: { type: Boolean, default: false },
    days: { type: [daySchema], required: true }
}, { collection: "opening" });

var reviewSchema = new Schema({
    author: { type: String, required: true },
    rating: { type: Number, required: true },
    reviewText: { type: String, required: true },
    createOn: { type: Date, default: Date.now }
}, { collection: "review" });

var locationSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    coords: { type: [Number], index: '2dsphere' },
    averageRating : {type:Number},
    reviews: [reviewSchema],
    openings: [openingSchema]
}, { collection: "location" });

mongoose.model("location", locationSchema);