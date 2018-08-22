const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config');

const indexRouter = require('./ui/routes/index');
const apiRouter = require('./ui/routes/api');
const indyHandler = require('./indy/src/handler')({ defaultHandlers: true, eventHandlers: [] }); // () executes the function so that we can potentially have multiple indy handlers;
// const uiMessageHandlers = require('./ui/uiMessageHandlers');
// uiMessageHandlers.enableDefaultHandlers(indyHandler);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'ui/views'));
app.set('view engine', 'ejs');

const FileStore = require('session-file-store')(session);
app.use(session({
    name: `server-session-cookie-id-for-${config.walletName}`,
    secret: config.sessionSecret,
    saveUninitialized: true,
    resave: true,
    rolling: true,
    store: new FileStore()
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (config.subUrl.length > 2) {
  //app.use('/saidot_tommi',express.static(path.join(__dirname, 'ui/public')));
  //app.set('base', '/saidot_tommi');
  //app.use('/saidot_tommi', indexRouter);
  //app.use('/saidot_tommi/api', apiRouter);
  app.use(config.subUrl, express.static(path.join(__dirname, 'ui/public')));
  app.set('base', config.subUrl);
  app.use(config.subUrl, indexRouter);
  app.use(config.subUrl+'/api', apiRouter);
  app.post('/indy', indyHandler.middleware);
} else {
  app.use(express.static(path.join(__dirname, 'ui/public')));
  app.use('/', indexRouter);
  app.use('/api', apiRouter);
  app.post('/indy', indyHandler.middleware);
};

// Invoke express-print-routes
var routepath = require('path');
var filepath = routepath.join(__dirname, './routes.generated.txt');
require('express-print-routes')(app, filepath);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(req._parsedUrl.path);
  console.log(config);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
