import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import AuthenticateStoreService from '@modules/stores/services/AuthenticateStoreService'

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateStore = container.resolve(AuthenticateStoreService)

    const { employee, token } = await authenticateStore.execute({
      email,
      password,
    })

    return response.json({ store: classToClass(employee), token })
  }
}
