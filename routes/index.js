const router = require("express").Router();
const { NOT_FOUND_ERROR } = require("../utils/errors");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", auth, userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Requested resource not found" });
});

module.exports = router;
