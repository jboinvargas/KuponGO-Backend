import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreatePromotionService from '@modules/promotions/services/CreatePromotionService'
import ShowProfileEmployeeService from '@modules/stores/services/ShowProfileEmployeeService'
import ShowAllStorePromotionsService from '@modules/promotions/services/ShowAllStorePromotionsService'
import AppError from '@shared/errors/AppError'

export default class StoresController {
  public async create(request: Request, response: Response): Promise<Response> {
    const employee_id = request.user.id

    const showProfileEmployee = container.resolve(ShowProfileEmployeeService)

    const employee = await showProfileEmployee.execute({ employee_id })

    const {
      name,
      description,
      start_time,
      finish_time,
      product_price,
      product_discount,
      quantity,
    } = request.body

    const createPromotion = container.resolve(CreatePromotionService)

    const store = await createPromotion.execute({
      employee_id,
      store_id: employee.store_id,
      name,
      description,
      start_time,
      finish_time,
      product_price,
      product_discount,
      quantity,
    })

    return response.json(classToClass(store))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { store_id } = request.params

    if (!store_id) {
      throw new AppError('Promotion not found')
    }

    const showAllStorePromotions = container.resolve(
      ShowAllStorePromotionsService,
    )

    const promotions = await showAllStorePromotions.execute({ store_id })

    return response.json(classToClass(promotions))
  }
}
