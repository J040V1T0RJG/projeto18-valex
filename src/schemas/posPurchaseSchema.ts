import joi from "joi";

const validatePosPurchase = joi.object({
    password: joi.string().length(4).pattern(/^[0-9]+$/).required(),
    businessId: joi.number().required(),
    amount: joi.number().greater(0).required()
});

export {
    validatePosPurchase
};