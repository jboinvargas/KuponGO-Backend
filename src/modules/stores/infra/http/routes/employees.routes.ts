import { Router } from 'express'

import EmployeeController from '../controllers/EmployeeController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const employeeRouter = Router()
const employeeController = new EmployeeController()

employeeRouter.use(ensureAuthenticated)

employeeRouter.get('/', employeeController.show)

export default employeeRouter
