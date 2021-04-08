const { User } = require('../models/User');
const redis_client = require("../redis-client");
const jwt = require('jsonwebtoken');
let auth = (req, res, next) => {
  // let token = req.cookies.w_auth;
  //
  // User.findByToken(token, (err, user) => {
  //   if (err) throw err;
  //   if (!user)
  //     return res.json({
  //       isAuth: false,
  //       error: true
  //     });
  //
  //   req.token = token;
  //   req.user = user;
  //   next();
  // });
  let accessToken = req.cookies.accessToken;

  console.log("0: "+accessToken)

  if (accessToken === null || accessToken === undefined) return res.json({
    isAuth: false,
    error: true,
  });
  console.log("1: "+accessToken)
  redis_client.get(accessToken, (err, data) => {
    if (err) throw err;
    if (data === null || data === 0 || data === undefined) return res.json({
      isAuth: false,
      error: true,
    });
    console.log("2:   "+accessToken)
    const decodeInfo = jwt.verify(accessToken, "9d5067a5a36f2bd6f5e93008865536c7", (err, decode) => {
      if (err) {
        res.status(500).json({ isAuth: false, error: true });
        throw err;
      }
      return decode;
    });

    const ssoUserId = decodeInfo.ssoUserId;

    User.find({ ssoUserId: ssoUserId })
        .then(userFound => {
          if (userFound.length === 0) {
            res.status(404).json({ isAuth: false, error: true });
            return;
          } else {
            const user = userFound[0];
            req.token = user.token;
            req.user = user;
            next();
          }
        })
  })
};

module.exports = { auth };
