import { Router, type NextFunction, type Request, type Response } from 'express';
import { AccountController } from '../controllers/account.controller.js';
const router = Router();
const accountController = new AccountController();
router.post('/accounts', (req, res, next: NextFunction) =>
  accountController.createAccount(req, res, next),
);
export default router;