'use strict';

if(!process.env.HEROKU) {
  require('dotenv').config();
}
/**
 * npm packages
 */
const fs = require('fs');
const express = require('express');
const app = require('express')();
const base64 = require('base-64');

/**
 * certs for https
 */
let options = {};
if (process.env.HTTPS) {
  const key = base64.decode(process.env.APP_KEY);
  const cert = base64.decode(process.env.APP_CRT);

  options = {
    key: key,
    cert: cert
  };
}

const server = process.env.HTTPS ? require('https').createServer(options, app) : require('http').createServer(app);
const port = process.env.PORT;
const cors = require('cors');
const ip = require("ip");

global.os = require('os');
global.ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      return;
    }

    if (alias >= 1) {
      console.log(ifname + ':' + alias, iface.address);
    } else {
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});

/**
 * router
 */
global.router = express.Router();

/**
 * config
 */
global.config = require('./config/index.js');

/**
 * global
 */
global.path = require('path');
global.dir = __dirname;

/**
 * logger
 */
global.chalk = require('chalk');
global.log = console.log;

/**
 * utils
 */
global.echo = require('./utils/echo.js');

/**
 * app
 */
app.options('*', cors());
app.use(cors());
app.use(express.static(global.path.join(global.dir, 'public')));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    );
    return res.status(200).json({});
  }

  next();
});
app.use(express.urlencoded({ extended: false }));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('trust proxy', 1);

/**
 * routes
 */
const index = require('./routes/index');
const status = require('./routes/status.js');

/**
 * html routes
 */
app.use('/', index);
app.use('/:code([3|4|5][0-9]{2})', status);

/**
 * status
 */
app.all('*', (req, res) => {
  res.redirect('/404');
});

module.exports = server.listen(port, () => {
  log(chalk`{bgBlue.bold Web:} {blue.bold ${process.env.HTTPS ? 'https' : 'http'}://localhost:${port}} {cyan.bold ${process.env.HTTPS ? 'https' : 'http'}://${ip.address()}:${port}}`)
  log(chalk`{bgBlue.bold API:} {blue.bold ${process.env.HTTPS ? 'https' : 'http'}://api.localhost:${port}} {cyan.bold ${process.env.HTTPS ? 'https' : 'http'}://api.${ip.address()}:${port}}`)
  chalk.reset();
});
