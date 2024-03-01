import express , {Request , Response , NextFunction} from 'express'
const router = express.Router()

import EmployeeRoutes from './employee'
import { checkLogin } from '../middleware/checkValidation'

router.use('/employees' , checkAuthen,EmployeeRoutes )
router.use('/login', login)

export default router