const User = require("../models").user;
const { toData } = require("./jwt");

async function auth(req, res, next) {
  const auth = req.headers.authorization?.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const user = await User.findByPk(data.userId);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).send({ message: "No user found" });
      }
    } catch (e) {
      res.status(400).send({ message: `${e.name}: ${e.message}` });
    }
  } else {
    res.status(401).send({ message: "Please provide some valid credentials" });
  }
}

module.exports = auth;
