'use strict';

if (!process.env.HEROKU) {
  require('dotenv').config();
}
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

/**
 * Replace ip package with custom IP class
 */
class IP {
  address() {
    const os = require('os');
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName of Object.keys(networkInterfaces)) {
      for (const iface of networkInterfaces[interfaceName]) {
        // Skip over internal (i.e., 127.0.0.1) and non-IPv4 addresses
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
    return '127.0.0.1';
  }
}

const ip = new IP();

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

const convert = (collection) => {
  if (collection instanceof Map) {
    let obj = {};
    for (let [k, v] of collection) {
      obj[k] = convert(v);
    }
    return obj;
  } else if (collection instanceof Set) {
    let arr = [];
    for (let value of collection) {
      arr.push(convert(value));
    }
    return arr;
  } else {
    return collection;
  }
};

const stringify = (data) => {
  return JSON.stringify(data);
};

const wss = require('ws').Server;
const socket = new wss({ server: server });
socket.broadcast = (obj) => socket.clients.forEach((client) => client.json(obj));

socket.on('connection', (ws) => {
  ws.json = (obj) => ws.send(JSON.stringify(obj));
  ws.broadcast = socket.broadcast;
  ws.id = uuid()

  ws.on('message', (message) => {
    message = JSON.parse(message);
    const { service, data } = message;

    switch (service) {
      default:
        log(chalk`{bgWhite.bold ${service}} {white.bold ${stringify(data)}}`);
        break;
    }
  });
});

module.exports = server.listen(port, () => {
  log(chalk`
{bgBlue.bold Web:}\t{blue.bold ${process.env.HTTPS ? 'https' : 'http'}://localhost:${port}} {cyan.bold ${process.env.HTTPS ? 'https' : 'http'}://${ip.address()}:${port}}
{bgBlue.bold API:}\t{blue.bold ${process.env.HTTPS ? 'https' : 'http'}://api.localhost:${port}} {cyan.bold ${process.env.HTTPS ? 'https' : 'http'}://api.${ip.address()}:${port}}
{bgBlue.bold Socket:}\t{blue.bold ${process.env.HTTPS ? 'wss' : 'ws'}://localhost:${port}} {cyan.bold ${process.env.HTTPS ? 'wss' : 'ws'}://${ip.address()}:${port}}
`);
  chalk.reset();
});
