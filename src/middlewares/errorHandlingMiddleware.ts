import { Request, Response, NextFunction } from "express";

const errorHandler = async (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error);

    if (error.code === "Unauthorized") {
        return res.status(401).send(error.message);
    };
    if (error.code === "PaymentRequired") {
        return res.status(402).send(error.message);
    };
    if (error.code === "NotFound") {
        return res.status(404).send(error.message);
    };
    if (error.code === "NotAcceptable") {
        return res.status(406).send(error.message);
    };
    if (error.code === "Conflict") {
        return res.status(409).send(error.message);
    };
    if (error.code === "UnprocessableEntity") {
        return res.status(422).send(error.message);
    };
    
    
    res.status(500).send(error); // internal server error
};

export {
    errorHandler
};