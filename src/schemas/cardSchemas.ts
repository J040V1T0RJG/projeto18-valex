import joi from "joi";

const validateCreateCardBody = joi.object({
    cpf: joi.string().required(),
    type: joi.string().required()
});

const validateFormatPassword = joi.object({
    password: joi.string().length(4).pattern(/^[0-9]+$/)
})

export {
    validateCreateCardBody,
    validateFormatPassword
}