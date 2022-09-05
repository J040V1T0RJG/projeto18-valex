import joi from "joi";

const validateCreateCardBody = joi.object({
    cpf: joi.string().length(11).pattern(/^[0-9]+$/).required(),
    type: joi.string().required()
});

const validateFormatPassword = joi.object({
    password: joi.string().length(4).pattern(/^[0-9]+$/).required()
});

const validateActivateCardBody = joi.object({
    cvc: joi.string().length(3).pattern(/^[0-9]+$/).required(),
    password: joi.string().length(4).pattern(/^[0-9]+$/).required()
});

export {
    validateCreateCardBody,
    validateFormatPassword,
    validateActivateCardBody
};