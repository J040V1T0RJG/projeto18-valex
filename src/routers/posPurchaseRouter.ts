import { Router } from "express";
import * as posPurchaseController from "../controllers/posPurchaseController";
import * as schemaMiddlewares from "../middlewares/schemaMiddlewares";

const posPurchaseRouter = Router();

posPurchaseRouter.post("/posPurchase/:cardId", schemaMiddlewares.validadePosPurchase, posPurchaseController.posPurchase);

export default posPurchaseRouter;