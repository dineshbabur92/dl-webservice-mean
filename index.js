var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");

var api = require("./server/api/v1");


var app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({urlEncoded: true}));

app.use(cookieParser());

app.use(passport.initialize());

app.use("/", api);

app.listen(3000);
console.log("server started succesfully");
