const Joi=require("joi");

module.exports.listingSchema=Joi.object({
    listing: Joi.object({
        title:Joi.string().required(),
        image:Joi.string().allow("",null),
        ingredients:Joi.string().required(),
        price:Joi.number().required().min(0),
    }).required()
});