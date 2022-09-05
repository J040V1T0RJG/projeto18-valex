"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateActivateCardBody = exports.validateFormatPassword = exports.validateCreateCardBody = void 0;
const joi_1 = __importDefault(require("joi"));
const validateCreateCardBody = joi_1.default.object({
    cpf: joi_1.default.string().length(11).pattern(/^[0-9]+$/).required(),
    type: joi_1.default.string().required()
});
exports.validateCreateCardBody = validateCreateCardBody;
const validateFormatPassword = joi_1.default.object({
    password: joi_1.default.string().length(4).pattern(/^[0-9]+$/).required()
});
exports.validateFormatPassword = validateFormatPassword;
const validateActivateCardBody = joi_1.default.object({
    cvc: joi_1.default.string().length(3).pattern(/^[0-9]+$/).required(),
    password: joi_1.default.string().length(4).pattern(/^[0-9]+$/).required()
});
exports.validateActivateCardBody = validateActivateCardBody;
