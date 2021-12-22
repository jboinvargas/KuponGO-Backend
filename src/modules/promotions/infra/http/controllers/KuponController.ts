import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CatchKuponService from '@modules/promotions/services/CatchKuponService'
import ShowAllUserKuponsService from '@modules/promotions/services/ShowAllUserKuponsService'
import AppError from '@shared/errors/AppError'
import ConfirmKuponService from '@modules/promotions/services/ConfirmKuponService'

export default class KuponController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { promotion_id } = request.params

    const katchKupon = container.resolve(CatchKuponService)

    const kupon = await katchKupon.execute({
      user_id,
      promotion_id,
    })

    return response.json(classToClass(kupon))
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    if (!user_id) {
      throw new AppError('Kupons não encontrados')
    }

    const showAllUserKupons = container.resolve(ShowAllUserKuponsService)

    const userKupons = await showAllUserKupons.execute({ user_id })

    return response.json(classToClass(userKupons))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { kupon_id } = request.params
    const employee_id = request.user.id

    const confirmKupon = container.resolve(ConfirmKuponService)

    const kupon = await confirmKupon.execute({ kupon_id, employee_id })

    return response.json(classToClass(kupon))
  }
}
