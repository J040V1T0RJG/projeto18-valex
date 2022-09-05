import { Request, Response } from "express";
import * as cardService from "../services/cardService";
import * as rechargeService from "../services/rechargeService";

const recharge = async (req: Request, res: Response) => {
    const apiKey = <string | undefined>req.headers["x-api-key"];
    const cardId = Number(req.params.cardId);
    const { amount } = req.body;

    await cardService.validateCardApiKey(apiKey);
    const card = await cardService.checkIfCardIsRegistered(cardId);
    await rechargeService.checkIfCardIsActivated(card);
    await cardService.checkIfCardIsExpired(card);
    await rechargeService.recharge(cardId, amount);

    res.sendStatus(200);
};

export {
    recharge
};