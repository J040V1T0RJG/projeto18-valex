"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardUnlock = exports.cardLock = exports.viewingCardBalanceAndTransactions = exports.activateCard = exports.createCard = void 0;
const cardService = __importStar(require("../services/cardService"));
const createCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = req.headers["x-api-key"];
    const { cpf, type } = req.body;
    yield cardService.validateCardApiKey(apiKey);
    const employee = yield cardService.checkRegisteredEmployee(cpf);
    yield cardService.checkIfAlreadyHaveThisCard(type, employee.id);
    yield cardService.createCard(employee.id, employee.fullName, type);
    res.sendStatus(201);
});
exports.createCard = createCard;
const activateCard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cvc, password } = req.body;
    const cardId = Number(req.params.cardId);
    const card = yield cardService.checkIfCardIsRegistered(cardId);
    yield cardService.checkIfCardIsExpired(card);
    yield cardService.checkIfCardIsActivated(card);
    yield cardService.checkCardCVC(card, cvc);
    const passwordEncrypt = yield cardService.validateFormatPasswordAndEncrypts(password);
    yield cardService.activateCard(cardId, card, passwordEncrypt);
    res.sendStatus(202);
});
exports.activateCard = activateCard;
const viewingCardBalanceAndTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cardId = Number(req.params.cardId);
    const card = yield cardService.checkIfCardIsRegistered(cardId);
    const result = yield cardService.balanceCard(cardId);
    res.status(200).send(result);
});
exports.viewingCardBalanceAndTransactions = viewingCardBalanceAndTransactions;
const cardLock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cardId = Number(req.params.cardId);
    const { password } = req.body;
    const IWantToBlockTheCard = true;
    const card = yield cardService.checkIfCardIsRegistered(cardId);
    yield cardService.checkIfCardIsExpired(card);
    yield cardService.checkCardLock(IWantToBlockTheCard, card);
    yield cardService.checkPassword(password, card);
    yield cardService.lockCardOrUnlock(cardId, card, IWantToBlockTheCard);
    res.sendStatus(202);
});
exports.cardLock = cardLock;
const cardUnlock = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cardId = Number(req.params.cardId);
    const { password } = req.body;
    const IWantToBlockTheCard = false;
    const card = yield cardService.checkIfCardIsRegistered(cardId);
    yield cardService.checkIfCardIsExpired(card);
    yield cardService.checkCardLock(IWantToBlockTheCard, card);
    yield cardService.checkPassword(password, card);
    yield cardService.lockCardOrUnlock(cardId, card, IWantToBlockTheCard);
    res.sendStatus(202);
});
exports.cardUnlock = cardUnlock;
