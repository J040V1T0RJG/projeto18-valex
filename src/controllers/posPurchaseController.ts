import { Request, Response } from "express";
import * as cardService from "../services/cardService";
import * as rechargeService from "../services/rechargeService";
import * as posPurchageService from "../services/posPurchageService";

const posPurchase = async (req: Request, res: Response) => {
    const cardId = Number(req.params.cardId);
    const { password, businessId, amount } = req.body;
    const paymentData = { cardId, businessId, amount };

    const card = await cardService.checkIfCardIsRegistered(cardId);
    await rechargeService.checkIfCardIsActivated(card);
    await cardService.checkIfCardIsExpired(card);
    await posPurchageService.isLock(card);
    await cardService.checkPassword(password, card);
    const business = await posPurchageService.checkBusiness(businessId);
    await posPurchageService.checkTypes(card.type, business.type);
    await posPurchageService.checkBalance(cardId, amount);
    await posPurchageService.purchase(paymentData);

  res.sendStatus(200);  
};

export {
    posPurchase
}