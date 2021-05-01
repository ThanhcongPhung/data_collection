const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require("../models/User");
const redis_client = require("../redis-client");

const CLIENT_SECRET = "tjfjfL7BSIdCyUnuc6R15Q4qtzWMMyZ8";

// CREATE USER
router.post("/users", (req, res) => {
  // console.log("Client-secret: ", req.headers["client-secret"]);
  // console.log("user info: ", req.body.user);

  // if (req.headers["client-secret"] !== CLIENT_SECRET) {
  //   res.status(405).send({ status: 0, error: "None of your business!" });
  //   return
  // }

  const userInfo = req.body.user;
  const matches = userInfo.match(/(?<!\p{L}\p{M}*)\p{L}\p{M}*/gu);
  const speaker_id = matches.join('') + userInfo.ssoUserId;
  const user = new User({
    name: userInfo.name,
    email: userInfo.email,
    ssoUserId: userInfo.ssoUserId,
    password: "12345678",
    role: 0,
    // sex: 0,
    image: userInfo.avatar,
    speaker_id:speaker_id,
  });

  user.save((err, doc) => {
    if (err) return res.status(500).send({ status: 0, error: err });
    return res.status(200).send({ status: 1 });
  });
})

// LOGIN
router.post("/users/token", (req, res) => {

  // if (req.headers["client-secret"] !== CLIENT_SECRET) {
  //   res.status(405).send({ status: 0, error: "None of your business!" });
  //   return
  // }

  const accessToken = req.body.accessToken;
  const decodeInfo = jwt.verify(accessToken, "9d5067a5a36f2bd6f5e93008865536c7", (err, decode) => {
    if (err) {
      res.status(500).send({ status: 0, err: `Having problem decoding, ${err}` });
      throw err;
    }
    return decode;
  });

  console.log(decodeInfo)
  const ssoUserId = decodeInfo.ssoUserId;

  User.find({ ssoUserId: ssoUserId })
      .then(userFound => {
        if (userFound.length === 0) {
          res.status(404).send({ status: 0, err: "User doesn't exist!" });
          return
        } else {
          const user = userFound[0];

          user.generateToken((err) => {
            if (err) return res.status(400).send({ status: 0, error: "Having problem recording user session!" });
          });

          // token, expire, 0 - offline, 1 - online
          redis_client.setex(accessToken, 4*3600, 1);
          res.status(200).send({ status: 1 });
        }
      })
})

// LOGOUT
router.post("/users/logout", (req, res) => {

  // if (req.headers["client-secret"] !== CLIENT_SECRET) {
  //   res.status(405).send({ status: 0, error: "None of your business!" });
  //   return
  // }

  const accessToken = req.body.accessToken;
  const decodeInfo = jwt.verify(accessToken, "9d5067a5a36f2bd6f5e93008865536c7", (err, decode) => {
    if (err) {
      res.status(500).send({ status: 0, err: `Having problem decoding, ${err}` });
      throw err;
    }
    return decode;
  });

  redis_client.del(accessToken);

  const ssoUserId = decodeInfo.ssoUserId;

  User.find({ ssoUserId: ssoUserId })
      .then(userFound => {
        if (userFound.length === 0) {
          res.status(404).send({ status: 0, err: "User doesn't exist!" });
          return
        } else {
          const user = userFound[0]
          if (user.tokenExp === null) {
            res.status(500).send({ status: 0, err: "The user is already logged out!" });
          } else {
            // user.token = "";
            // user.tokenExp = "";
            // user.save();
            res.status(200).send({ status: 1 });
          }
        }
      })
      .catch(err => {
        res.status(500).send({ status: 0, error: err });
      });
})

router.get("/isLogin", (req, res) => {
  let accessToken = req.cookies.accessToken;
  console.log(accessToken);
  if (accessToken === undefined || accessToken === null) return res.status(200).send({ status: 1, isAuth: false });


  redis_client.get(accessToken, (err, value) => {
    if (err) return res.status(500).send({ status: 0, error: "Having problem retrieving user information!" });
    if (value === 0 || value === null || value === undefined) {
      console.log("Value: ", value);
      res.status(200).send({ status: 1, isAuth: false });
    } else {
      res.status(200).send({ status: 1, isAuth: true });
    }

  })
})

router.put("/updateUser", (req, res) => {
  const accessToken = req.body.accessToken;
  const userId = req.body.user;
  const decodeInfo = jwt.verify(accessToken, "9d5067a5a36f2bd6f5e93008865536c7", (err, decode) => {
    if (err) {
      res.status(500).send({ status: 0, err: `Having problem decoding, ${err}` });
      throw err;
    }
    return decode;
  });

  redis_client.del(accessToken);

  const ssoUserId = decodeInfo.ssoUserId;
  User.find({ ssoUserId: ssoUserId })
      .then(userFound => {
        if (userFound.length === 0) {
          res.status(404).send({ status: 0, err: "User doesn't exist!" });
          return
        } else {
          const user = userFound[0]
          user.birthday = userId.birthday;
          user.phone_number = userId.phone_number;
          user.accent = userId.accent;
          user.gender = userId.gender;
          res.status(200).send({ status: 1 });
          return user.save();
        }
      })
      .catch(err => {
        res.status(500).send({ status: 0, error: err });
      });
})
// Unsuable, work fine in Insomnia, but axios can't update req.session in browser :<
// router.get("/isLogin", (req, res) => {
//   if (req.session.user !== null && req.session.user !== undefined) {
//     res.status(200).send({ status: 1, isAuth: true });
//     return
//   }

//   req.session.destroy((err)=>{
//     if(err) res.status(500).send({ status: 0, error: err });
//     else res.status(200).send({ status: 1, isAuth: false });
//   });

// })

module.exports = router;