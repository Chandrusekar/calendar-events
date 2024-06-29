import Joi from 'joi';

const appointmentSchema = Joi.object({
  title: Joi.string().required(),
  create_date: Joi.date(),
  id: Joi.string(),
  start: Joi.date().required(),
  end: Joi.date().required(),
  userId: Joi.string().required(),
  status: Joi.string().required(),
});

export {
  appointmentSchema,
};