import { Router } from "express";
import * as rechargeFunctions from "../controllers/rechargeController";

const rechargeRouter = Router();

rechargeRouter.post("/recharge/:id", rechargeFunctions.recharge);

export default rechargeRouter;