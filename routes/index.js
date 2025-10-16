const router = require("express").Router();
const { NOT_FOUND_ERROR } = require("../utils/errors.js");
const userRouter = require("./users.js");
const clothingItemRouter = require("./clothingItems.js");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Requested resource not found" });
});

module.exports = router;
