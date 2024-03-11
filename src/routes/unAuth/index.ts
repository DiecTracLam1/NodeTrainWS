import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

import EmployeeRoutes from "./employee/base";

router.use("/employees",EmployeeRoutes);

export default router;
