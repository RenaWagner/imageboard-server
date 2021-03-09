const { Router } = require("express");
const Image = require("../models/").image; //ファイル名なので単数
const { toData } = require("../auth/jwt");
const router = new Router();
const authMiddleware = require("../auth/middleware");

router.get("/", authMiddleware, async (req, res) => {
  const limit = Math.min(req.query.limit || 25, 500); // limit indicates how many results are on a page.
  const offset = req.query.offset || 0; //how many results to skip

  const images = await Image.findAndCountAll({ limit, offset });
  res.send({ images: images.rows, total: images.count }); // you cannot just pass the model, you have to pass the object by using findAll
});

router.post("/", async (req, res, next) => {
  try {
    const image = await Image.create(req.body);
    res.json(image);
  } catch (e) {
    next(e);
  }
});

router.get("/:imageId", async (req, res, next) => {
  try {
    const imageId = parseInt(req.params.imageId);
    const specificImage = await Image.findByPk(imageId);
    res.json(specificImage);
  } catch (e) {
    next(e);
  }
});

// router.get("/auth/messy", async (req, res, next) => {
//   const auth = req.headers.authorization?.split(" ");
//   // same as const auth = req.headers.authorization && req.headers.authorization.split(" ");
//   if (auth && auth[0] === "Bearer" && auth[1]) {
//     // console.log(auth[1]);
//     try {
//       const data = toData(auth[1]);
//       // console.log(data);
//       const allImages = await Image.findAll();
//       res.json(allImages);
//     } catch (e) {
//       console.log(e.message);
//       res.status(400).send("Invalid JWT token");
//     }
//   } else {
//     res.status(401).send({
//       message: "Please supply some valid credentials",
//     });
//   }
// });

module.exports = router;
