import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ShowPromotionService from '@modules/promotions/services/ShowPromotionService'
import AppError from '@shared/errors/AppError'

export default class ShowPromotionController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { promotion_id } = request.params

    if (!promotion_id) {
      throw new AppError('Promotion not found')
    }

    const showPromotion = container.resolve(ShowPromotionService)

    const promotion = await showPromotion.execute({ promotion_id })

    return response.json(classToClass(promotion))
  }
}
