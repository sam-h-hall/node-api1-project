const Joi = require("joi");

const validateUserReq = (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    bio: Joi.string().required(),
  });

  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const {
    error,
    // value // we aren't using value, so we don't need it
  } = schema.validate(req.body, options); // validating req.body, storing any errors in error

  if (error) {
    res.status(400).json({
      // message: error.message
      message: "Please provide username and bio for the user.",
    });
  } else {
    return true;
  }
};
