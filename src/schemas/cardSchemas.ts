import joi from "joi";

const validateCreateCardBody = joi.object({
    cpf: joi.string().required(),
    type: joi.string().required()
});

export {
    validateCreateCardBody
}