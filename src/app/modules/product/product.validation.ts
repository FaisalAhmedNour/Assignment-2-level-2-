import Joi from 'joi';

//validate using joi
const JoiValidationSchemaForVariant = Joi.object({
  type: Joi.string().required().trim(),
  value: Joi.string().required().trim(),
});

const JoiValidationSchemaForInventory = Joi.object({
  quantity: Joi.number().required(),
  inStock: Joi.boolean().required(),
});

export const JoiValidationSchemaForProduct = Joi.object({
  name: Joi.string().required().trim(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  category: Joi.string().required().trim(),
  tags: Joi.array().items(Joi.string().trim()).required(),
  variants: Joi.array().items(JoiValidationSchemaForVariant).required(),
  inventory: JoiValidationSchemaForInventory.required(),
});
