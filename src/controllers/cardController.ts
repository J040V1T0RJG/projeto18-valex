import { Request, Response } from "express";
import * as cardService from "../services/cardService";


const createCard = async (req: Request, res: Response) => {
    const apiKey = <string | undefined>req.headers["x-api-key"];
    const { cpf, type } = req.body;

    await cardService.validateCardApiKey(apiKey);
    const employee = await cardService.checkRegisteredEmployee(cpf);
    await cardService.checkIfAlreadyHaveThisCard(type, employee.id);
    await cardService.createCard(employee.id, employee.fullName, type);

    res.sendStatus(201);
};

const activateCard = async (req: Request, res: Response) => {
    const { cvc, password } = req.body;
    const cardId = Number(req.params.cardId);

    const card = await cardService.checkIfCardIsRegistered(cardId);
    await cardService.checkIfCardIsExpired(card);
    await cardService.checkIfCardIsActivated(card);
    await cardService.checkCardCVC(card, cvc);
    const passwordEncrypt = await cardService.validateFormatPasswordAndEncrypts(password);
    await cardService.activateCard(cardId, card, passwordEncrypt);

    res.sendStatus(202);
};

const viewingCardBalanceAndTransactions = async (req: Request, res: Response) => {
    const cardId = Number(req.params.cardId);

    const card = await cardService.checkIfCardIsRegistered(cardId);
    const result = await cardService.balanceCard(cardId);

    res.status(200).send(result);
};

const cardLock = async (req: Request, res: Response) => {
    const cardId = Number(req.params.cardId);
    const { password } = req.body;
    const IWantToBlockTheCard = true;

    const card = await cardService.checkIfCardIsRegistered(cardId);
    await cardService.checkIfCardIsExpired(card);
    await cardService.checkCardLock(IWantToBlockTheCard, card);
    await cardService.checkPassword(password, card);
    await cardService.lockCardOrUnlock(cardId, card, IWantToBlockTheCard);

    res.sendStatus(202);
};

const cardUnlock = async (req: Request, res: Response) => {
    const cardId = Number(req.params.cardId);
    const { password } = req.body;
    const IWantToBlockTheCard = false;

    const card = await cardService.checkIfCardIsRegistered(cardId);
    await cardService.checkIfCardIsExpired(card);
    await cardService.checkCardLock(IWantToBlockTheCard, card);
    await cardService.checkPassword(password, card);
    await cardService.lockCardOrUnlock(cardId, card, IWantToBlockTheCard);

    res.sendStatus(202);
};

export {
    createCard,
    activateCard,
    viewingCardBalanceAndTransactions,
    cardLock,
    cardUnlock
};