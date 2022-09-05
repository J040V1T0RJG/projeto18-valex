import joi from "joi";

const validateAmount =  joi.object({
    amount: joi.number().greater(0).required()
});

export {
    validateAmount
};