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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lockCardOrUnlock = exports.checkPassword = exports.checkCardLock = exports.balanceCard = exports.activateCard = exports.validateFormatPasswordAndEncrypts = exports.checkCardCVC = exports.checkIfCardIsActivated = exports.checkIfCardIsExpired = exports.checkIfCardIsRegistered = exports.createCard = exports.checkIfAlreadyHaveThisCard = exports.checkRegisteredEmployee = exports.validateCardApiKey = void 0;
const cardRepository = __importStar(require("../repositories/cardRepository"));
const paymentRepository = __importStar(require("../repositories/paymentRepository"));
const rechargeRepository = __importStar(require("../repositories/rechargeRepository"));
const faker_1 = require("@faker-js/faker");
const formatEmployeeName_1 = require("../utils/formatEmployeeName");
const compareDates_1 = require("../utils/compareDates");
const cardSchemas_1 = require("../schemas/cardSchemas");
const dayjs_1 = __importDefault(require("dayjs"));
const cryptr_1 = __importDefault(require("cryptr"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateCardApiKey = (apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    if (!apiKey) {
        throw { code: "PaymentRequired", message: "ApiKey não recebida" };
    }
    ;
    const company = yield cardRepository.findByApiKey(apiKey);
    if (!company) {
        throw { code: "NotFound", message: "Empresa não encontrada" };
    }
    ;
});
exports.validateCardApiKey = validateCardApiKey;
const checkRegisteredEmployee = (cpf) => __awaiter(void 0, void 0, void 0, function* () {
    const employee = yield cardRepository.findByEmproyee(cpf);
    if (!employee) {
        throw { code: "Unauthorized", message: "Somente empregados cadastrados podem ter cartões" };
    }
    ;
    return employee;
});
exports.checkRegisteredEmployee = checkRegisteredEmployee;
const checkIfAlreadyHaveThisCard = (type, employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    const card = yield cardRepository.findByTypeAndEmployeeId(type, employeeId);
    if (card) {
        throw { code: "Conflict", message: "Empregado já tem esse cartão" };
    }
    ;
});
exports.checkIfAlreadyHaveThisCard = checkIfAlreadyHaveThisCard;
const createCard = (employeeId, employeeName, type) => __awaiter(void 0, void 0, void 0, function* () {
    const cryptr = new cryptr_1.default(`${process.env.SECRET_PASSWORD}`);
    const number = faker_1.faker.finance.account(16);
    const securityCode = cryptr.encrypt(faker_1.faker.finance.account(3));
    const cardholderName = (0, formatEmployeeName_1.formatEmployeeName)(employeeName);
    const expirationDate = (0, dayjs_1.default)().add(5, "years").format("MM/YYYY");
    const cardData = {
        employeeId,
        number,
        cardholderName,
        securityCode,
        expirationDate,
        password: undefined,
        isVirtual: false,
        originalCardId: undefined,
        isBlocked: true,
        type,
    };
    yield cardRepository.insert(cardData);
});
exports.createCard = createCard;
const checkIfCardIsRegistered = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const card = yield cardRepository.findById(id);
    if (!card) {
        throw { code: "NotFound", message: "Cartão não encontrado" };
    }
    ;
    return card;
});
exports.checkIfCardIsRegistered = checkIfCardIsRegistered;
const checkIfCardIsExpired = (card) => __awaiter(void 0, void 0, void 0, function* () {
    const dateExpired = (0, compareDates_1.dateHasAlreadyExpired)(card.expirationDate);
    if (dateExpired) {
        throw { code: "Unauthorized", message: "Cartão expirado" };
    }
    ;
});
exports.checkIfCardIsExpired = checkIfCardIsExpired;
const checkIfCardIsActivated = (card) => __awaiter(void 0, void 0, void 0, function* () {
    if (card.password) {
        throw { code: "Unauthorized", message: "Cartão já está ativado" };
    }
    ;
});
exports.checkIfCardIsActivated = checkIfCardIsActivated;
const checkCardCVC = (card, cvc) => __awaiter(void 0, void 0, void 0, function* () {
    const cryptr = new cryptr_1.default(`${process.env.SECRET_PASSWORD}`);
    const cvcDecrypt = cryptr.decrypt(card.securityCode);
    if (cvcDecrypt !== cvc) {
        throw { code: "Unauthorized", message: "SecurityCode invalido" };
    }
    ;
});
exports.checkCardCVC = checkCardCVC;
const validateFormatPasswordAndEncrypts = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = cardSchemas_1.validateFormatPassword.validate({ password }, { abortEarly: false });
    if (error) {
        throw { code: "UnprocessableEntity", message: "Campo password invalido" };
    }
    ;
    const cryptr = new cryptr_1.default(`${process.env.SECRET_PASSWORD}`);
    const passwordEncrypt = cryptr.encrypt(password);
    return passwordEncrypt;
});
exports.validateFormatPasswordAndEncrypts = validateFormatPasswordAndEncrypts;
const activateCard = (id, card, passwordEncrypt) => __awaiter(void 0, void 0, void 0, function* () {
    card.password = passwordEncrypt;
    yield cardRepository.update(id, card);
});
exports.activateCard = activateCard;
const balanceCard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let amount = 0;
    const payments = yield paymentRepository.findByCardId(id);
    const recharges = yield rechargeRepository.findByCardId(id);
    payments.map((payment) => {
        amount -= payment.amount;
    });
    recharges.map((recharge) => {
        amount += recharge.amount;
    });
    const result = {
        balance: amount,
        transactions: payments,
        recharges: recharges
    };
    return result;
});
exports.balanceCard = balanceCard;
const checkCardLock = (isLock, card) => __awaiter(void 0, void 0, void 0, function* () {
    let message;
    const blockedOrNot = (isLock === card.isBlocked);
    {
        isLock ? message = "Cartão já está bloqueado" : message = "Cartão já está desbloqueado";
    }
    ;
    if (blockedOrNot) {
        throw { code: "NotAcceptable", message };
    }
    ;
});
exports.checkCardLock = checkCardLock;
const checkPassword = (password, card) => __awaiter(void 0, void 0, void 0, function* () {
    const cryptr = new cryptr_1.default(`${process.env.SECRET_PASSWORD}`);
    const passwordDecrypt = cryptr.decrypt(card.password);
    if (passwordDecrypt !== password) {
        throw { code: "Unauthorized", message: "Password invalido" };
    }
    ;
});
exports.checkPassword = checkPassword;
const lockCardOrUnlock = (id, card, isLock) => __awaiter(void 0, void 0, void 0, function* () {
    card.isBlocked = isLock;
    console.log("isLock: ", isLock, "card.isBlocked: ", card.isBlocked);
    yield cardRepository.update(id, card);
});
exports.lockCardOrUnlock = lockCardOrUnlock;
