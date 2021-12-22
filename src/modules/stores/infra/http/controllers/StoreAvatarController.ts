import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import UpdateStoreAvatarService from '@modules/stores/services/UpdateStoreAvatarService'
import ShowProfileEmployeeService from '@modules/stores/services/ShowProfileEmployeeService'

export default class StoreAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const employee_id = request.user.id
    const updateStoreAvatar = container.resolve(UpdateStoreAvatarService)

    const showProfileEmployee = container.resolve(ShowProfileEmployeeService)

    const employee = await showProfileEmployee.execute({ employee_id })

    const store = await updateStoreAvatar.execute({
      store_id: employee.store_id,
      avatarFilename: request.file.filename,
    })

    return response.json(classToClass(store))
  }
}
