import { Request, Response, NextFunction } from "express";
import * as cardSchemas from "../schemas/cardSchemas";
import * as posPurchaseSchema from "../schemas/posPurchaseSchema";

const validadeSchemaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = cardSchemas.validateCreateCardBody.validate(body, { abortEarly: false });

    if (error) {
        throw {code: "UnprocessableEntity", message: "Campos 'cpf' e/ou 'type' invalido"}
    };

    next();
};

const validadePosPurchase = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = posPurchaseSchema.validatePosPurchase.validate(body, { abortEarly: false });

    if (error) {
        throw {code: "UnprocessableEntity", message: "Campos 'password' e/ou 'businessId' e/ou 'amount' invalido"}
    };

    next();
};

export {
    validadeSchemaMiddleware,
    validadePosPurchase
}