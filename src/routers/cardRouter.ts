import { Router } from "express";
import * as cardController from "../controllers/cardController";
import * as cardMiddlewares from "../middlewares/cardMiddlewares";
import * as schemaMiddlewares from "../middlewares/schemaMiddlewares";

const cardRouter = Router();

cardRouter.post("/card/createCard",  schemaMiddlewares.validadeSchemaMiddleware, cardMiddlewares.validateCardType, cardController.createCard);
cardRouter.put("/card/:cardId/activateCard", schemaMiddlewares.cardActivationRouteValidation, cardController.activateCard);
cardRouter.get("/card/:cardId/viewingCardBalanceAndTransactions", cardController.viewingCardBalanceAndTransactions);
cardRouter.put("/card/:cardId/cardLock", schemaMiddlewares.cardLockOrUnlockRouteValidation, cardController.cardLock);
cardRouter.put("/card/:cardId/cardUnlock", schemaMiddlewares.cardLockOrUnlockRouteValidation, cardController.cardUnlock);

export default cardRouter;