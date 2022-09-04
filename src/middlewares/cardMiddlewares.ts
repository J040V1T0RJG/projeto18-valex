import { Request, Response, NextFunction } from "express";

const validateCardType = async (req: Request, res: Response, next: NextFunction) => {
    const cardType: string = req.body.type;
    const acceptedType = (cardType === "groceries" || cardType === "restaurant" || cardType === "transport" || cardType === "education"|| cardType === "health");

    if (!acceptedType) {
        throw { code: "Unauthorized", message: "Tipo de cartão invalido"}
    };

    next();
};

export {
    validateCardType
};