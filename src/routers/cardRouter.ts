import { Router } from "express";
import * as cardFunctions from "../controllers/cardController";
import * as cardMiddlewares from "../middlewares/cardMiddlewares";
import * as schemaMiddlewares from "../middlewares/schemaMiddlewares";

const cardRouter = Router();

cardRouter.post("/card/createCard",  schemaMiddlewares.validadeSchemaMiddleware, cardMiddlewares.validateCardType, cardFunctions.createCard);
cardRouter.put("/card/:id/activateCard", cardFunctions.activateCard);
cardRouter.get("/card/:id/viewingCardBalanceAndTransactions", cardFunctions.viewingCardBalanceAndTransactions);
cardRouter.put("/card/:id/cardLock", cardFunctions.cardLock);



export default cardRouter;