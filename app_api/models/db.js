var mongoose = require("mongoose");
var uri = "mongodb://localhost/AdvancedSpa";

if(process.env.NODE_ENV === 'production'){
    uri = process.env.MONGO_URI
}

mongoose.connect(uri);

mongoose.connection.on("connected", function(){
    console.log("connected to " + uri);
})

mongoose.connection.on("disconnected", function(){
    console.log("disconnected to " + uri);
});

mongoose.connection.on("error", function(err){
    console.log(err);
});
require("./location");
require("./user");
