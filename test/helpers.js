let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

const crypto = () => require('crypto').randomBytes(32).toString('base64');

const routes = [
  '',
  '400',
  '401',
  '403',
  '404',
  '500',
  '503',
];

const domains = [
  '',
  'api.'
];

const router = (domains, routes) => {
  describe('/GET Routes', () => {
    domains.forEach((subdomain) => {
      describe(`${subdomain === '' ? 'web' : 'api'}`, () => {

        routes.forEach((route) => {
          it(`it should GET ${route === '' ? 'index' : route} route on ${subdomain === '' ? 'web' : 'api'} domain`, (done) => {
            // Construct the host URL for both the main and API domain
            const host = `${subdomain}localhost:3000`;
            const url = `/${route}`; // Base route for both

            chai.request(server)
              .get(url)
              .set('Host', host)  // Set the Host header to simulate subdomain requests
              .redirects(1)
              .end((err, res) => {
                expect(res).to.not.redirect;
                res.should.have.status(200);
                done();
              });
          });
        });
      });
    });
  });
};

module.exports = {
  crypto,
  domains,
  routes,
  router
};
