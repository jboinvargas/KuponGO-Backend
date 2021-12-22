import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IKuponsRepository from '../repositories/IKuponsRepository'

import Kupon from '../infra/typeorm/entities/Kupon'
import IPromotionsRepository from '../repositories/IPromotionsRepository'

interface IRequest {
  promotion_id: string
  user_id: string
}

@injectable()
class CatchKuponService {
  constructor(
    @inject('KuponsRepository')
    private kuponsRepository: IKuponsRepository,

    @inject('PromotionsRepository')
    private promotionsRepository: IPromotionsRepository,
  ) {}

  public async execute({ user_id, promotion_id }: IRequest): Promise<Kupon> {
    const promotion = await this.promotionsRepository.findById(promotion_id)
    if (!promotion) {
      throw new AppError('Promotion not found.', 404)
    }
    if (promotion.used_quantity >= promotion.quantity) {
      const kupons = await this.kuponsRepository.findAllAvailableKupons(
        promotion_id,
      )

      kupons.map(async (kuponOutStock: Kupon) => {
        // eslint-disable-next-line no-param-reassign
        kuponOutStock.status = 'out_stock'
        await this.kuponsRepository.save(kuponOutStock)
        return kuponOutStock
      })

      throw new AppError(`Out of stock for this promotion.`, 401)
    }

    const kupon = await this.kuponsRepository.create({
      user_id,
      promotion_id,
      status: 'available',
      kupon_type: 'normal',
    })

    return kupon
  }
}

export default CatchKuponService
