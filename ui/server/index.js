const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const crypto = require('crypto');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const path = require('path');
const basicAuth = require('express-basic-auth');

const { csrf: csrfToken, security, seo } = require('./middleware');
const configureNunjucks = require('./nunjucks-configuration');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;
const https = Boolean(process.env.HTTPS || 0);

app.use(seo);
app.use(security);
app.use(compression());

const cookie = {
  path: '/',
  httpOnly: true,
  secure: https,
  sameSite: 'strict',
  maxAge: 604800000, // 7 days
};

const sessionOptions = {
  secret: process.env.SESSION_SECRET || crypto.randomBytes(256 / 8).toString('hex'),
  resave: false,
  saveUninitialized: true,
  cookie,
};

app.use(session(sessionOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(csrf());
app.use(csrfToken());

configureNunjucks({
  autoescape: true,
  express: app,
  noCache: true,
});

app.use(morgan('dev', {
  skip: (req) => req.url.startsWith('/assets'),
}));

app.use(basicAuth({
  users: {
    [process.env.BASIC_AUTH_KEY]: process.env.BASIC_AUTH_SECRET,
  },
  challenge: true,
}));

app.use('/', routes);

app.use(
  '/assets',
  express.static(path.join(__dirname, '..', 'node_modules', 'govuk-frontend', 'govuk', 'assets')),
  express.static(path.join(__dirname, '..', 'public')),
);

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res.redirect('/problem-with-service');
});

// app.get('*', (req, res) => res.render('page-not-found.njk', { user: req.session.user }));

app.listen(PORT, () => console.info(`EXIP UI app listening on port ${PORT}!`));
