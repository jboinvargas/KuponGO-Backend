import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import UpdatePromotionAvatarService from '@modules/promotions/services/UpdatePromotionAvatarService'

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updatePromotionAvatar = container.resolve(
      UpdatePromotionAvatarService,
    )

    const promotion = await updatePromotionAvatar.execute({
      employee_id: request.user.id,
      promotion_id: request.body.promotion_id,
      avatarFilename: request.file.filename,
    })

    return response.json(classToClass(promotion))
  }
}
