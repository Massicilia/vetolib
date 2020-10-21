const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config/config.json');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//routers
const RouterIndex = require('./routes/index');
const RouterAppointment = require('./routes/appointment');
const RouterVeterinary = require('./routes/veterinary').router;
const RouterPet = require('./routes/pet');
const RouterPetowner = require('./routes/petowner').router;
const RouterClinic = require('./routes/clinic').router;
const RouterInvoice = require('./routes/invoice');
const RouterConsultation = require('./routes/consultation').router;
const RouterAdministrator = require('./routes/administrator').router;
const RouterSubscriptionRequest = require('./routes/subscriptionrequest').router;
const RouterStripePayment = require('./routes/stripepayment');

const generateInvoices = require('./use_case/invoiceGeneration');
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // headers authorization for preflight requests
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
      // allowed XHR methods
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
    });
  });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(config.rootAPI + '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// generate invoices
generateInvoices.generateInvoices();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.post('/api/status', function (req, res, next) {
  //
});

module.exports = app;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const expressHandlebars = require('express-handlebars');

app.engine('.hbs', expressHandlebars({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(config.rootAPI, RouterIndex);
app.use(config.rootAPI + '/veterinary', RouterVeterinary);
app.use(config.rootAPI + '/appointment', RouterAppointment);
app.use(config.rootAPI + '/pet', RouterPet);
app.use(config.rootAPI + '/petowner', RouterPetowner);
app.use(config.rootAPI + '/clinic', RouterClinic);
app.use(config.rootAPI + '/invoice', RouterInvoice);
app.use(config.rootAPI + '/consultation', RouterConsultation);
app.use(config.rootAPI + '/administrator', RouterAdministrator);
app.use(config.rootAPI + '/subscriptionrequest', RouterSubscriptionRequest);
app.use(config.rootAPI + '/card-wallet', RouterStripePayment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
/*
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, HEAD, OPTIONS, PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  next();
});*/

module.exports = app;

