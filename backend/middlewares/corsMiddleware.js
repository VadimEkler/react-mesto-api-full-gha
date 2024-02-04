const httpConstants = require('http2').constants;

const ALLOWED_CORS = [
  'https://https://vadimekler.nomoredomainsmonster.ru',
  'http://http://vadimekler.nomoredomainsmonster.ru',
  'http://localhost:3000',
];
const ALLOWED_METHODS = ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'];

const corsMiddleware = (req, res, next) => {
  const { origin } = req.headers;
  if (ALLOWED_CORS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', ALLOWED_METHODS.join(','));
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    return res.status(httpConstants.HTTP_STATUS_OK).end();
  }

  next();
};

module.exports = corsMiddleware;
