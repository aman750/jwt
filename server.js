
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors')
var passport =require('passport')
// var MongoStore = require('connect-mongo/es5')(session);


var secret = require('./config/secret');
var User = require('./models/user');
// var Category = require('./models/category');

var app = express();

mongoose.connect(secret.database, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to the database");
  }
});
require('./config/passport')(passport)
// Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session())


// app.use(function(req, res, next) {
//   Category.find({}, function(err, categories) {
//     if (err) return next(err);
//     res.locals.categories = categories;
//     next();
//   });
// });


require('./routes/routes')(app,passport)
// var userRoutes = require('./routes/user');
// var adminRoutes = require('./routes/admin');
// var apiRoutes = require('./api/api');

// app.use(mainRoutes);
// app.use(userRoutes);
// app.use(adminRoutes);
// app.use('/api', apiRoutes);

app.listen(secret.port, function(err) {
  if (err) throw err;
  console.log("Server is Running on port " + secret.port);
});
