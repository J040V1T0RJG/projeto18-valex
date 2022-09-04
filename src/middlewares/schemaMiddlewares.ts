import { Request, Response, NextFunction } from "express";
import * as schemas from "../schemas/cardSchemas"

const validadeSchemaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const { error } = schemas.validateCreateCardBody.validate(body, { abortEarly: false });

    if (error) {
        throw {code: "UnprocessableEntity", message: "Campos 'cpf' e/ou 'type' invalido"}
    };

    next();
};

export {
    validadeSchemaMiddleware
}