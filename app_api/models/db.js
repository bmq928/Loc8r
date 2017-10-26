var mongoose = require("mongoose");
var uri = "mongodb://localhost/AdvancedSpa";

if(process.env.NODE_ENV === 'production'){
    // uri = process.env.MONGO_URI;
    uri = "mongodb://user_name:password@ds129315.mlab.com:29315/advanced_spa"
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
