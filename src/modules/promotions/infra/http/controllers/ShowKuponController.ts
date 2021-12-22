import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import ShowKuponService from '@modules/promotions/services/ShowKuponService'
import AppError from '@shared/errors/AppError'

export default class ShowKuponController {
  public async show(request: Request, response: Response): Promise<Response> {
    const employee_id = request.user.id
    const { kupon_id } = request.params

    if (!kupon_id) {
      throw new AppError('Kupon not found')
    }

    const showKupon = container.resolve(ShowKuponService)

    const kupon = await showKupon.execute({ kupon_id, employee_id })

    return response.json(classToClass(kupon))
  }
}
