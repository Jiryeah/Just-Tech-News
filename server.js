const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection');
const session = require(`express-session`);

const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

const sess = {
  secret: 'Super secret secret',
  // tells our sessions to use cookies
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

// Handlebars 
const exphbs = require(`express-handlebars`);
const hbs = exphbs.create({});
// Set the stage for stylesheet availability
const path = require(`path`);

const app = express();
const PORT = process.env.PORT || 3001;

app.engine(`handlebars`, hbs.engine);
app.set(`view engine`, `handlebars`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//*The express.static() method is a built-in Express.js middleware function that 
//* can take all of the contents of a folder and serve them as static assets.
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
// turn on routes
app.use(routes);

// turn on connection to db and server
//* force: true = DROP TABLE IF EXISTS.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});






