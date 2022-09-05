"use strict";
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
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(error);
    if (error.code === "Unauthorized") {
        return res.status(401).send(error.message);
    }
    ;
    if (error.code === "PaymentRequired") {
        return res.status(402).send(error.message);
    }
    ;
    if (error.code === "NotFound") {
        return res.status(404).send(error.message);
    }
    ;
    if (error.code === "NotAcceptable") {
        return res.status(406).send(error.message);
    }
    ;
    if (error.code === "Conflict") {
        return res.status(409).send(error.message);
    }
    ;
    if (error.code === "UnprocessableEntity") {
        return res.status(422).send(error.message);
    }
    ;
    res.status(500).send(error); // internal server error
});
exports.errorHandler = errorHandler;
