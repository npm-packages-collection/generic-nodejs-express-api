const { domains, routes, router } = require('./helpers');

process.env.NODE_ENV = 'test';
process.env.PORT=3000

router(domains, routes);