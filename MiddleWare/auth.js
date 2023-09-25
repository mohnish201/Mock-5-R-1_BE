const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    jwt.verify(token, "masai", (err, decoded) => {
      if (decoded) {
        next();
      } else {
        res.send("UnAuthorized");
      }
    });
  } else {
    res.send("You are not logged in");
  }
};

module.exports = {
  auth,
};
