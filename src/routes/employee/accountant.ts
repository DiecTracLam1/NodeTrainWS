import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { AccountantController } from "../../controller";
import { AccountantService } from "../../service/employees";
import { AccountantRepository } from "../../repository/employees";

const controller = new AccountantController(
  new AccountantService(new AccountantRepository())
);
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await controller.getAll();
    res.json(data.rows);
  } catch (error) {}
});

export default router;
