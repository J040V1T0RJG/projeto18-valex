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
exports.purchase = exports.checkBalance = exports.checkTypes = exports.checkBusiness = exports.isLock = void 0;
const businessRepository = __importStar(require("../repositories/businessRepository"));
const cardService = __importStar(require("../services/cardService"));
const paymentRepository = __importStar(require("../repositories/paymentRepository"));
const isLock = (card) => __awaiter(void 0, void 0, void 0, function* () {
    if (card.isBlocked) {
        throw { code: "Unauthorized", message: "Cartão está bloqueado" };
    }
    ;
});
exports.isLock = isLock;
const checkBusiness = (businessId) => __awaiter(void 0, void 0, void 0, function* () {
    const business = yield businessRepository.findById(businessId);
    if (!business) {
        throw { code: "NotFound", message: "Estabelecimento não encontrado" };
    }
    ;
    return business;
});
exports.checkBusiness = checkBusiness;
const checkTypes = (cardType, businessType) => __awaiter(void 0, void 0, void 0, function* () {
    if (cardType !== businessType) {
        throw { code: "NotAcceptable", message: "Tipo de cartão imcompartivel com o tipo do estabelecimento" };
    }
    ;
});
exports.checkTypes = checkTypes;
const checkBalance = (cardId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const { balance } = yield cardService.balanceCard(cardId);
    if (amount > balance) {
        throw { code: "NotAcceptable", message: "Saldo insuficiente" };
    }
    ;
});
exports.checkBalance = checkBalance;
const purchase = (payment) => __awaiter(void 0, void 0, void 0, function* () {
    yield paymentRepository.insert(payment);
});
exports.purchase = purchase;
