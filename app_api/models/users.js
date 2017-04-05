var mongoose = require("mongoose");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
    
    email:{
        type: String,
        unique: true,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    hash:{
        type: String
    },
    salt:{
        type: String
    }
    
});

userSchema.methods.setPassword = function(){
    
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt);
    
}

userSchema.methods.validatePassword = function(password){
    
    return this.hash === crypto.pbkdf2Sync(password, this.salt);
    
}

userSchema.methods.generateJwt = function(){
    
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        name: this.name,
        email: this.email,
        expiry: parseInt(expiry.getTime()/1000)
    }, "some secret");
    
}

exports.userSchema = userSchema;
return mongoose.model("users", userSchema);
console.log(
    
);
