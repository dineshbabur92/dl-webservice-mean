var mongoose = require("mongoose");
var userSchema = require("./users");

process.env.MONGODB_URI = "mongodb://localhost:27017/test";
//console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI);

module.exports = (function(){
    var User = mongoose.model("User", userSchema, "users");
    
    return {
        "User": User
    }
})();