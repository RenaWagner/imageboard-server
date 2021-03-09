const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const authRouter = require("./routers/auth");
const jsonParser = express.json();
const authMiddleware = require("./auth/middleware");

app.use(jsonParser);

app.use("/users", userRouter);
app.use("/images", authMiddleware, imageRouter);
app.use("/auth", authRouter);

function onListen() {
  console.log(`Listening on: ${port}`);
}

app.listen(port, onListen);
