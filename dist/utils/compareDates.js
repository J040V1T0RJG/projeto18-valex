"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateHasAlreadyExpired = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const dateHasAlreadyExpired = (dueDate) => {
    const now = (0, dayjs_1.default)().format("MM/YYYY");
    const date1 = dueDate.split("/");
    const date2 = now.split("/");
    if (date2[1] > date1[1]) {
        return true;
    }
    else if (date2[1] === date1[1]) {
        if (date2[0] > date1[0]) {
            return true;
        }
        ;
    }
    ;
    return false;
};
exports.dateHasAlreadyExpired = dateHasAlreadyExpired;
