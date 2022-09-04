import { Request, Response } from "express";
import * as cardService from "../services/cardService";
import * as rechargeService from "../services/rechargeService";

const recharge = async (req: Request, res: Response) => {
    const cardId = Number(req.params.id);
    const { amount } = req.body;

    const card = await cardService.checkIfCardIsRegistered(cardId);
    await rechargeService.checkIfCardIsActivated(card);
    await cardService.checkIfCardIsExpired(card);
    await rechargeService.recharge(cardId, amount);

    res.sendStatus(200);
};

export {
    recharge
};