const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "The email field is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "The email field must be a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "The password field is required"],
    minlength: 8,
    select: false,
  },
  name: { type: String, required: true, minlength: 2, maxlength: 30 },
  avatar: {
    type: String,
    required: [true, "The avatar field is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "The avatar field must be a valid URL",
    },
  },
});

userSchema.pre("save", function hashPassword(next) {
  if (!this.isModified("password")) {
    return next();
  }

  return bcrypt
    .hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
      return next();
    })
    .catch(next);
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
