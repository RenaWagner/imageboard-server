const bcrypt = require("bcrypt");
const { Router } = require("express");
const User = require("../models").user; //ファイル名なので単数
const router = new Router();

router.get("/", async (req, res) => {
  const users = await User.findAll();
  if (!users) {
    res.status(404).send("User not found: 404");
  } else {
    res.send(users.map((user) => user.get({ plain: true })));
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;
    if (!email || email === " ") {
      req.status(404).send("Must have an email address");
    } else {
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      // console.log(newUser);
      res.send(newUser);
    }
  } catch (e) {
    next(e);
  }
});
module.exports = router;
