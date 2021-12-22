import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ShowProfileEmployeeService from '@modules/stores/services/ShowProfileEmployeeService'

export default class EmployeeController {
  public async show(request: Request, response: Response): Promise<Response> {
    const employee_id = request.user.id

    const showProfileEmployee = container.resolve(ShowProfileEmployeeService)

    const employee = await showProfileEmployee.execute({ employee_id })

    return response.json(classToClass(employee))
  }
}
