var authCtrl = require("../controllers/authCtrl");
var adminCtrl = require("../controllers/adminCtrl");

var express = require("express");
var router = express.Router();

var jwt = require("express-jwt");

process.env.JWT_SECRET = "some secret";

var auth = jwt({
        
    secret: process.env.JWT_SECRET,
    userProperty: "payload",
    getToken: function(req){
        return req.get("payload");
    }


});

router.post("/register", authCtrl.register);
router.post("/login", authCtrl.login);
router.get("/admin", auth, adminCtrl.profile);

module.exports = router;
