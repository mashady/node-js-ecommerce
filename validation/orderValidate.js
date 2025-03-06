import Joi from "joi";

export const orderSchema = Joi.object({
  cart: Joi.string().required(),
  shippingAddress: Joi.object({
    fullName: Joi.string().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  paidAt: Joi.date().iso(),
});


