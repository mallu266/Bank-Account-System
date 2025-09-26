import {
  Router,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { AccountController } from "../controllers/account.controller.js";
const router = Router();
const accountController = new AccountController();
router.post("/accounts", (req, res, next: NextFunction) =>
  accountController.createAccount(req, res, next),
);
router.post(
  "/accounts/deposit-amount",
  (req: Request, res: Response, next: NextFunction) =>
    accountController.depositAmount(req, res, next),
);
router.post(
  "/accounts/withdraw-amount",
  (req: Request, res: Response, next: NextFunction) =>
    accountController.withdrawAmount(req, res, next),
);
router.post(
  "/accounts/present-cheque",
  (req: Request, res: Response, next: NextFunction) =>
    accountController.presentCheque(req, res, next),
);
export default router;
