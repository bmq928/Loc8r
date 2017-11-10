require("dotenv").load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var apiRouter = require("./app_api/routes/index");
var passport = require("passport");
var uglify = require("uglify-js");
var fs = require("fs");

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();
require("./app_api/models/db");
require("./app_api/config/passport");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var uglifiedCode = "";
var clientFiles = [
  "public/angular/angular.js",
  "public/angular-route/angular-route.js",
  "public/angular-sanitize/angular-sanitize.min.js",
  "public/angular-ui-bootstrap/ui-bootstrap-tpls-2.5.0.min.js",
  "app_client/app.js",
  "app_client/home/home.controller.js",
  "app_client/auth/register/register.controller.js",
  "app_client/auth/login/login.controller.js",
  "app_client/detail/detail.controller.js",
  "app_client/addReview/addReview.controller.js",
  "app_client/about/about.controller.js",
  "app_client/common/filters/numToTime.filter.js",
  "app_client/common/filters/displayParagraph.filter.js",
  "app_client/common/services/locationData.service.js",
  "app_client/common/services/authentication.service.js",
  "app_client/common/directives/navigator/navigator.directive.js",
  "app_client/common/directives/comment/comment.directive.js",
  "app_client/common/directives/pageFooter/pageFooter.directive.js",
  "app_client/common/directives/pageHeader/pageHeader.directive.js",
  "app_client/common/directives/locationInfo/locationInfo.directive.js",
  "app_client/common/directives/ratingStar/ratingStar.directive.js",
  "app_client/common/directives/navigator/navigator.controller.js"
];
for (let i in clientFiles) {
  let content = fs.readFileSync(clientFiles[i], "utf8");
  uglifiedCode += uglify.minify(content, { compress: false }).code;
}
// var uglifiedCode = uglify.minify(clientFiles, { compress: false }).code;
fs.writeFile('public/client_app.min.js', uglifiedCode, function (err) {
  if (err) console.log(err);
  else console.log("minify success");
});

console.log(__dirname);
console.log(require('fs').existsSync(__dirname + '/public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));


//init passport
app.use(passport.initialize());
app.use(passport.session());

// app.use('/', index);
// app.use('/users', users);
app.use("/api", apiRouter);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.get('/', function (request, response) {
//   response.render('pages/index')
// });
// app.get('/cool', function (request, response) {
//   response.send(cool());
// });

// app.use(function (req, res, next) {
//   res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
//   console.log("send file succees")
// });

app.get('*', function (req, res) {
  console.log("send file succees");
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
  
})

// console.log("send file complete");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//unauthorize handler
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ "message": err.name + ": " + err.message });
  }
});

// console.log('secret' + process.env.JWT_SECRET);

module.exports = app;