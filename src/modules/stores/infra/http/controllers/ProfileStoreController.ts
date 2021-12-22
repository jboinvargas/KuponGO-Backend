import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import UpdateStoreService from '@modules/stores/services/UpdateStoreService'
import ShowProfileEmployeeService from '@modules/stores/services/ShowProfileEmployeeService'

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const employee_id = request.user.id
    const showProfileEmployee = container.resolve(ShowProfileEmployeeService)

    const employee = await showProfileEmployee.execute({ employee_id })

    const {
      name,
      // email,
      // old_password,
      // password,
      cnpj,
      zip_code,
      state,
      city,
      district,
      street,
      number,
      phone,
      status,
      opening_hours,
      latitude,
      longitude,
    } = request.body

    const updateStore = container.resolve(UpdateStoreService)

    const store = await updateStore.execute({
      store_id: employee.store_id,
      name,
      // email,
      // old_password,
      // password,
      cnpj,
      zip_code,
      state,
      city,
      district,
      street,
      number,
      phone,
      status,
      opening_hours,
      latitude,
      longitude,
    })

    return response.json(classToClass(store))
  }
}
