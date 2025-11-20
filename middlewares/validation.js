const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The minimum length of the name field is 2",
      "string.max": "The maximum length of the name field is 30",
      "string.empty": "The name field must be filled in",
    }),
    weather: Joi.string().required().valid("hot", "warm", "cold").messages({
      "string.empty": "The weather field must be filled in",
      "any.only": "Weather must be one of: hot, warm, or cold",
    }),
    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The imageUrl field must be filled in",
      "string.uri": "The imageUrl field must be a valid URL",
    }),
  }),
});

const validateUserCreate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The minimum length of the name field is 2",
      "string.max": "The maximum length of the name field is 30",
      "string.empty": "The name field must be filled in",
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The avatar field must be filled in",
      "string.uri": "The avatar field must be a valid URL",
    }),
    email: Joi.string().required().email().messages({
      "string.empty": "The email field must be filled in",
      "string.email": "The email field must be a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password field must be filled in",
    }),
  }),
});

const validateUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": "The email field must be filled in",
      "string.email": "The email field must be a valid email",
    }),
    password: Joi.string().required().messages({
      "string.empty": "The password field must be filled in",
    }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "The minimum length of the name field is 2",
      "string.max": "The maximum length of the name field is 30",
      "string.empty": "The name field must be filled in",
    }),
    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": "The avatar field must be filled in",
      "string.uri": "The avatar field must be a valid URL",
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).messages({
      "string.hex": "Invalid ID format",
      "string.length": "ID must be 24 characters long",
    }),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).messages({
      "string.hex": "Invalid ID format",
      "string.length": "ID must be 24 characters long",
    }),
  }),
});

module.exports = {
  validateClothingItem,
  validateUserCreate,
  validateUserLogin,
  validateUserUpdate,
  validateId,
  validateUserId,
};
