var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var passport = require("passport");

var api = require("./server/api/v1");

var port = 3000;

require("./server/config/passport");


var app = express();

app.use(morgan("dev"));

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({urlEncoded: true}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(passport.initialize());

app.use("/", api);


app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name }); //+ ": " + err.message});
  }
});


app.listen(3000);
console.log("server started at port: "+ port);
