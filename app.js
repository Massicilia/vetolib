var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config/config.json');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
//routers
var RouterIndex = require('./routes/index');
var RouterAppointment = require('./routes/appointment');
var RouterVeterinary = require('./routes/veterinary');
var RouterPet = require('./routes/pet');
var RouterPetowner = require('./routes/petowner').router;
var RouterClinic = require('./routes/clinic').router;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(config.rootAPI + '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(config.rootAPI, RouterIndex);
app.use(config.rootAPI + '/veterinary', RouterVeterinary);
app.use(config.rootAPI + '/appointment', RouterAppointment);
app.use(config.rootAPI + '/pet', RouterPet);
app.use(config.rootAPI + '/petowner', RouterPetowner);
app.use(config.rootAPI + '/clinic', RouterClinic);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
