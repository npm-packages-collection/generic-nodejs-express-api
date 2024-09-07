const { crypto, domains, routes, router } = require('./helpers');

process.env.NODE_ENV = 'test';
process.env.PORT=3000
process.env.APP_CRT=crypto()
process.env.APP_KEY=crypto()
process.env.HTTPS

router(domains, routes);
