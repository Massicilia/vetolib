var createError = require('http-errors');
var express = require('express');
var router = express.Router();
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
var RouterVeterinary = require('./routes/veterinary').router;
var RouterPet = require('./routes/pet');
var RouterPetowner = require('./routes/petowner').router;
var RouterClinic = require('./routes/clinic').router;
var RouterInvoice = require('./routes/invoice');
var RouterConsultation = require('./routes/consultation').router;
var RouterAdministrator = require('./routes/administrator').router;
var RouterSubscriptionRequest = require('./routes/subscriptionrequest').router;
var RouterStripePayment = require('./routes/stripepayment');
// stripe
const stripe = require('stripe')('sk_test_51HM2DTGVBJFFbfQTXQ1RJ3FA6Jn7e7wdjEVguo9HBVUvPX4mdmijMSmm51NxwsBU27VcJuMaWpiS6b1UcVTlNArY00I7TYtrWJ');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(config.rootAPI + '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// CORS ACCESS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/status', function (req, res, next) {
  // your code goes here
});

app.get('/card-wallet', async (req, res) => {
  const intent =  await stripe.setupIntents.create({
    customer: customer.id,
  });
  res.render('card_wallet', { client_secret: intent.client_secret });
});


module.exports = app;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//cron jobs
const invoicesGeneration = require('./use_case/InvoiceGeneration');
const cron = require("node-cron");
/*cron.schedule("* * * * *", function () {
  console.log("Running Cron Job");
  //var invoicesGeneration = new InvoicesGeneration();
  invoicesGeneration.generateInvoices();
});*/

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
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

