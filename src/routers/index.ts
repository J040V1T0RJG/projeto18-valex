import { Router } from "express";

import cardRouter from "./cardRouter";
import rechargeRouter from "./rechargeRouter";
import posPurchaseRouter from "./posPurchaseRouter";

const router = Router();

router.use(cardRouter);
router.use(rechargeRouter);
router.use(posPurchaseRouter);

export default router;