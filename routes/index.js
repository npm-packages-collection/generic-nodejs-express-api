'use strict';

const { preflight } = require('../utils/preflight');
const { api } = require('../utils/api');

const response = {
  route: '/',
  success: {
    code: 200,
    status: 'OK',
    description: 'The request was successful.'
  }
}

/*
 * GET
 */
router.get('/', api, preflight, (req, res) => {
  if (req.api) {
    echo(res, {
      ...response
    });

    return
  }

  res.render(`${dir}/views/index.html`, {
    response
  });
})

module.exports = router;