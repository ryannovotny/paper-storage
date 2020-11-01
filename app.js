var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Add Mongoose for MongoDB
var mongoose = require('mongoose').set('debug', true);
mongoose.Promise = global.Promise;

// Set Mongoose Options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }

// Connect to MongoDB Server
mongoose.connect('mongodb://ryan:7926Sacjdm*7926@192.168.1.135:27017/Papers?authSource=admin', options)
.then(() => console.log( 'Database Connected!' ))
.catch(err => console.log( err ));

// Add Mongoose schema
require('./models/Papers');

// Add Needed Routes
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));

app.use('/', routes);
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist'));
app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/bs-table', express.static(__dirname + '/node_modules/bootstrap-table/dist'));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
