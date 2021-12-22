import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IPromotionsRepository from '../repositories/IPromotionsRepository'

import Promotion from '../infra/typeorm/entities/Promotion'

interface IRequest {
  promotion_id: string
}

@injectable()
class ShowPromotionService {
  constructor(
    @inject('PromotionsRepository')
    private promotionsRepository: IPromotionsRepository,
  ) {}

  public async execute({ promotion_id }: IRequest): Promise<Promotion> {
    const promotion = await this.promotionsRepository.findById(promotion_id)

    if (!promotion) {
      throw new AppError('Promotion not found')
    }

    return promotion
  }
}

export default ShowPromotionService
