const api = (req, res, next) => {
  const host = req.headers.host;
  req.api = host.startsWith('api.');
  next();
}

module.exports = {
  api
}