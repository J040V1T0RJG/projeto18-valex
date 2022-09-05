import { Request, Response, NextFunction } from "express";
import * as cardSchemas from "../schemas/cardSchemas";
import * as posPurchaseSchema from "../schemas/posPurchaseSchema";
import * as rechargeSchema from "../schemas/rechargeSchema";

const validadeSchemaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = cardSchemas.validateCreateCardBody.validate(body, { abortEarly: false });

    if (error) {
        throw {code: "UnprocessableEntity", message: "Campos 'cpf' e/ou 'type' invalido(s)"}
    };

    next();
};

const cardActivationRouteValidation = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = cardSchemas.validateActivateCardBody.validate(body, { abortEarly: false });

    if (error) {
        throw {code: "UnprocessableEntity", message: "Campos 'cvc' e/ou 'password' invalido(s)"}
    };

    next();
};

const cardLockOrUnlockRouteValidation = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = cardSchemas.validateFormatPassword.validate(body, { abortEarly: false });

    if (error) {
        throw {code: "UnprocessableEntity", message: "Campo 'password' invalido"}
    };

    next();
};

const cardRechargeRouteValidation = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = rechargeSchema.validateAmount.validate(body, { abortEarly: false });

    if (error) {
        throw {code: "UnprocessableEntity", message: "Campo 'amount' invalido"}
    };

    next();
};


const validadePosPurchase = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = posPurchaseSchema.validatePosPurchase.validate(body, { abortEarly: false });

    if (error) {
        throw {code: "UnprocessableEntity", message: "Campos 'password' e/ou 'businessId' e/ou 'amount' invalido(s)"}
    };

    next();
};


export {
    validadeSchemaMiddleware,
    validadePosPurchase,
    cardActivationRouteValidation,
    cardLockOrUnlockRouteValidation,
    cardRechargeRouteValidation
};