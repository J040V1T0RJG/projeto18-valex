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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRechargeRouteValidation = exports.cardLockOrUnlockRouteValidation = exports.cardActivationRouteValidation = exports.validadePosPurchase = exports.validadeSchemaMiddleware = void 0;
const cardSchemas = __importStar(require("../schemas/cardSchemas"));
const posPurchaseSchema = __importStar(require("../schemas/posPurchaseSchema"));
const rechargeSchema = __importStar(require("../schemas/rechargeSchema"));
const validadeSchemaMiddleware = (req, res, next) => {
    const body = req.body;
    const { error } = cardSchemas.validateCreateCardBody.validate(body, { abortEarly: false });
    if (error) {
        throw { code: "UnprocessableEntity", message: "Campos 'cpf' e/ou 'type' invalido(s)" };
    }
    ;
    next();
};
exports.validadeSchemaMiddleware = validadeSchemaMiddleware;
const cardActivationRouteValidation = (req, res, next) => {
    const body = req.body;
    const { error } = cardSchemas.validateActivateCardBody.validate(body, { abortEarly: false });
    if (error) {
        throw { code: "UnprocessableEntity", message: "Campos 'cvc' e/ou 'password' invalido(s)" };
    }
    ;
    next();
};
exports.cardActivationRouteValidation = cardActivationRouteValidation;
const cardLockOrUnlockRouteValidation = (req, res, next) => {
    const body = req.body;
    const { error } = cardSchemas.validateFormatPassword.validate(body, { abortEarly: false });
    if (error) {
        throw { code: "UnprocessableEntity", message: "Campo 'password' invalido" };
    }
    ;
    next();
};
exports.cardLockOrUnlockRouteValidation = cardLockOrUnlockRouteValidation;
const cardRechargeRouteValidation = (req, res, next) => {
    const body = req.body;
    const { error } = rechargeSchema.validateAmount.validate(body, { abortEarly: false });
    if (error) {
        throw { code: "UnprocessableEntity", message: "Campo 'amount' invalido" };
    }
    ;
    next();
};
exports.cardRechargeRouteValidation = cardRechargeRouteValidation;
const validadePosPurchase = (req, res, next) => {
    const body = req.body;
    const { error } = posPurchaseSchema.validatePosPurchase.validate(body, { abortEarly: false });
    if (error) {
        throw { code: "UnprocessableEntity", message: "Campos 'password' e/ou 'businessId' e/ou 'amount' invalido(s)" };
    }
    ;
    next();
};
exports.validadePosPurchase = validadePosPurchase;
