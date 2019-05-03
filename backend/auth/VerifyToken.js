var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config'); // get our config file

function verifyToken(req, res, next) {

  // check header or url parameters or post parameters for token
  // var token = req.headers['x-access-token'];
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });

    // try {
    //   const decoded = jwt.verify(token, "secretkey");
    //   if(role[decoded.role].find(function(url){ return url==req.baseUrl})){req.user=decoded
    //   next();
    //   }

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  // verifies secret and checks exp
  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });

    // if everything is good, save to request for use in other routes
    req.userId = decoded.id;
    next();
  });

}

module.exports = verifyToken;