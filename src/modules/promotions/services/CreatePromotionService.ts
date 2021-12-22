import { injectable, inject } from 'tsyringe'

import IPromotionsRepository from '../repositories/IPromotionsRepository'

import Promotion from '../infra/typeorm/entities/Promotion'

interface IRequest {
  employee_id: string
  store_id: string
  name: string
  description: string
  start_time: Date
  finish_time: Date
  product_price: number
  product_discount: number
  quantity: number
}

@injectable()
class CreatePromotionService {
  constructor(
    @inject('PromotionsRepository')
    private promotionsRepository: IPromotionsRepository,
  ) {}

  public async execute({
    employee_id,
    store_id,
    name,
    description,
    start_time,
    finish_time,
    product_price,
    product_discount,
    quantity,
  }: IRequest): Promise<Promotion> {
    const promotion = await this.promotionsRepository.create({
      employee_id,
      store_id,
      name,
      description,
      start_time,
      finish_time,
      product_price,
      product_discount,
      quantity,
    })

    return promotion
  }
}

export default CreatePromotionService
