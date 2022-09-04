import { Router } from "express";
import * as cardFunctions from "../controllers/cardController";
import * as cardMiddlewares from "../middlewares/cardMiddlewares";
import * as schemaMiddlewares from "../middlewares/schemaMiddlewares";

const cardRouter = Router();

cardRouter.post("/card/create",  schemaMiddlewares.validadeSchemaMiddleware, cardMiddlewares.validateCardType, cardFunctions.createCard);
cardRouter.post("/card/:id/activateCard", cardFunctions.activateCard);

export default cardRouter;