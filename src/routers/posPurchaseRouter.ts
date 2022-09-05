import { Router } from "express";
import * as posPurchaseFunctions from "../controllers/posPurchaseController";
import * as schemaMiddlewares from "../middlewares/schemaMiddlewares";

const posPurchaseRouter = Router();

posPurchaseRouter.post("/posPurchase/:id", schemaMiddlewares.validadePosPurchase, posPurchaseFunctions.posPurchase);

export default posPurchaseRouter;