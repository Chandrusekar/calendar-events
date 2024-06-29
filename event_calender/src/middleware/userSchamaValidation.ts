import Joi from 'joi';

const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  DOB: Joi.string().required(),
  password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().min(6).required(),
});

export {
  signupSchema,
  loginSchema,
};