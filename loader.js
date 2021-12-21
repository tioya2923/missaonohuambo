//const express = require('express');
const app = require('./server');

//const servirdor = require('./server');
const router = require('./routes/main.route'); 
const passport = require('passport');
const session = require('express-session');
const expressSanitizer = require('express-sanitizer');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const models = require("./models");
const { check, validationResult } = require('express-validator');


//app.use(servirdor());
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true}));
app.use(expressSanitizer());
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(session({
    secret: 'hbomissao40',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 60000,
        httpOnly: true,
    }
}));


app.post('/user', [
  // username must be an email
  check('username').isEmail(),
  // password must be at least 5 chars long
  check('password').isLength({ min: 5 })
], (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  User.create({
    username: req.body.username,
    password: req.body.password
  }).then(user => res.json(user));
});

//app.use(expressValidator());


app.use(function(req, res, next) {
  // check if session exists
  if (global.sessData === undefined) {
    global.sessData = req.session;
    global.sessData.ID = req.sessionID;
  }
  else { // yes, cookie was already present
    console.log('session exists', global.sessData.ID);
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./routes/auth.route.js')(app, passport);
require('./config/passport/passort.js')(passport, models.user);
//Sync Database
models.sequelize.sync().then(function() {
  console.log('Nice! Database looks fine');

}).catch(function(err) {
  console.log(err, "Something went wrong with the Database Update!");
});
app.use('/', router);
module.exports = app;

