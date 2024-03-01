import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import { ItController } from "../../controller";
import { ItService } from "../../service/employees";
import { ItRepository } from "../../repository/employees";

const controller = new ItController(new ItService(new ItRepository()));

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await controller.getAll();
    console.log("dasdas")
    res.json(data.rows);
  } catch (error) {}
});

export default router;
