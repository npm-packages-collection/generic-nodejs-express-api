const fetch = require('node-fetch');
const querystring = require('querystring');

/*
 * request
 */
module.exports = async (payload) => {
  const query = payload.query || {};
  const url = `https://${payload.host}${payload.path}${query ? `?${querystring.stringify(query)}` : ''}`;
  const options = {
    method: payload.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...payload.headers
    }
  };

  if (payload.body) {
    options.body = JSON.stringify(payload.body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
  } catch (e) {
    throw e;
  }
};
