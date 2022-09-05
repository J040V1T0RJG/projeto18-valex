"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePosPurchase = void 0;
const joi_1 = __importDefault(require("joi"));
const validatePosPurchase = joi_1.default.object({
    password: joi_1.default.string().length(4).pattern(/^[0-9]+$/).required(),
    businessId: joi_1.default.number().required(),
    amount: joi_1.default.number().greater(0).required()
});
exports.validatePosPurchase = validatePosPurchase;
