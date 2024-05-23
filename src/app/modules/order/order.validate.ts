import Joi from 'joi';

export const JoiValidationSchemaForOrder = Joi.object({
  email: Joi.string().required().trim(),
  productId: Joi.string().required().trim(),
  price: Joi.number().required(),
  quantity: Joi.number().required(),
});
