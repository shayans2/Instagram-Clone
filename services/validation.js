const Joi = require("@hapi/joi");

const validationService = (type, data) => {
  let schema = Object();

  switch (type) {
    case "auth":
      schema = Joi.object({
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(5).required(),
      });
      break;

    case "post":
      schema = Joi.object({
        userId: Joi.string().required(),
        location: Joi.string().required(),
        postImage: Joi.string().required(),
        caption: Joi.string().required(),
      });
      break;

    case "comment":
      schema = Joi.object({
        content: Joi.string().required(),
      });

      break;

    case "user":
      schema = Joi.object({
        fullname: Joi.string().min(3).max(50).required(),
        username: Joi.string().min(3).max(50).lowercase().trim().required(),
        profileImage: Joi.string(),
        biography: Joi.string().max(255),
        website: Joi.string().max(1024).lowercase().trim(),
        email: Joi.string()
          .min(3)
          .max(255)
          .lowercase()
          .trim()
          .email()
          .required(),
        password: Joi.string().min(5).required(),
      });
      break;
  }

  return schema.validate(data);
};

module.exports = validationService;
