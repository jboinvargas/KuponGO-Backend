import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateStoreService from '@modules/stores/services/CreateStoreService'
import ShowAllStoresService from '@modules/stores/services/ShowAllStoresService'

export default class StoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, latitude, longitude } = request.body

    const createStore = container.resolve(CreateStoreService)

    const store = await createStore.execute({
      name,
      email,
      password,
      latitude,
      longitude,
    })

    return response.json(classToClass(store))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showAllStores = container.resolve(ShowAllStoresService)

    const stores = await showAllStores.execute()

    return response.json(classToClass(stores))
  }
}
