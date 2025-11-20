const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
  ConflictError,
} = require("../utils/customErrors");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  if (!name || !avatar || !email || !password) {
    next(new BadRequestError("Invalid user data"));
    return;
  }
  User.findOne({ email })
    .then((existing) => {
      if (existing) {
        throw new ConflictError("Email already exists");
      }

      return User.create({ name, avatar, email, password })
        .then((user) => {
          const userObj = user.toObject();
          delete userObj.password;
          return res.status(201).send(userObj);
        })
        .catch((err) => {
          if (err.name === "ValidationError") {
            next(new BadRequestError("Invalid user data"));
          } else if (err.code === 11000) {
            next(new ConflictError("Email already exists"));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user && req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid user ID"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("Email and password are required"));
    return;
  }

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      if (
        err &&
        (err.message === "Incorrect email or password" ||
          err.name === "AuthenticationError")
      ) {
        next(new UnauthorizedError("Invalid email or password"));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
  const userId = req.user && req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true, context: "query" }
  )
    .orFail()
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(200).send(userObj);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found"));
      } else if (err.name === "ValidationError" || err.name === "CastError") {
        next(new BadRequestError("Invalid data"));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  updateProfile,
  login,
};
