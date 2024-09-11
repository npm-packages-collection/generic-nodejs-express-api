const preflight = async (req, res, next) => {
  switch (true) {
    case req.path === '/':
      next();
      break;
    default:
      log(chalk`{bgGreen.bold preflight:} {red.bold redirect}`);
      return res.redirect('/');
  }
};

module.exports = {
  preflight
};
