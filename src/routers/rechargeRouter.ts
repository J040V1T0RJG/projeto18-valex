import { Router } from "express";
import * as rechargeController from "../controllers/rechargeController";
import * as schemaMiddlewares from "../middlewares/schemaMiddlewares";

const rechargeRouter = Router();

rechargeRouter.post("/recharge/:cardId", schemaMiddlewares.cardRechargeRouteValidation, rechargeController.recharge);

export default rechargeRouter;