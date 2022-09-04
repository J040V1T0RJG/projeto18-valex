import { Request, Response } from "express";
import * as cardService from "../services/cardService"


const createCard = async (req: Request, res: Response) => {
    const apiKey = <string | undefined>req.headers["x-api-key"];
    const { cpf, type } = req.body;

    await cardService.validateCardApiKey(apiKey);
    const employee = await cardService.checkRegisteredEmployee(cpf);
    await cardService.checkIfAlreadyHaveThisCard(type, employee.id);
    await cardService.createCard(employee.id, employee.fullName, type);

    res.sendStatus(202);
};

export {
    createCard
}