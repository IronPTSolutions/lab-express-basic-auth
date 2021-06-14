// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv/config');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

// ℹ️ Responsible for the messages you see in the terminal as requests are coming in
// https://www.npmjs.com/package/morgan
const logger = require('morgan');

// ℹ️ Needed when we deal with cookies (we will when dealing with authentication)
// https://www.npmjs.com/package/cookie-parser
const cookieParser = require('cookie-parser');

const hbs = require('hbs');

const app = express();

/** APP CONFIGURATION */
// ℹ️ Connect to the databse
require('./config/db.config');
// In development environment the app logs
app.use(logger('dev'));

//REGISTER PARTIALS
hbs.registerPartials(`${__dirname}/./views/partials`);

/** VIEWS ENGINE SETUP */
// Normalizes the path to the views folder
app.set('views', `${__dirname}/views`);
// Sets the view engine to handlebars
app.set('view engine', 'hbs');
// Handles access to the public folder
app.use(express.static(`${__dirname}/public`));


/** HTTP BODY PARSER SETUP */
// To have access to `body` property in the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const { sessionConfig, loadUser } = require('./config/session.config');
app.use(sessionConfig);
app.use(loadUser);

/** ROUTES SETUP */

// default value for title local
const projectName = 'lab-express-basic-auth';
const capitalized = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const routes = require('./config/routes.config');
app.use('/', routes);


/** ERROR HANDLING */
// this middleware runs whenever requested page is not available
app.use((req, res, next) => res.status(404).render('errors/not-found'));
// whenever you call next(err), this middleware will handle the error
app.use((err, req, res, next) => {
  // always logs the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).render('errors/internal');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Ready! Listening on port ${port}`));

