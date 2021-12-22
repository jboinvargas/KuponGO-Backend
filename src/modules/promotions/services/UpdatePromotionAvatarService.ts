import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'
import IEmployeesRepository from '@modules/stores/repositories/IEmployeesRepository'
import IPromotionsRepository from '../repositories/IPromotionsRepository'

import Promotion from '../infra/typeorm/entities/Promotion'

interface IRequest {
  promotion_id: string
  employee_id: string
  avatarFilename: string
}

@injectable()
class UpdatePromotionAvatarService {
  constructor(
    @inject('PromotionsRepository')
    private promotionsRepository: IPromotionsRepository,

    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    promotion_id,
    employee_id,
    avatarFilename,
  }: IRequest): Promise<Promotion> {
    const employee = await this.employeesRepository.findById(employee_id)
    const promotion = await this.promotionsRepository.findById(promotion_id)

    if (!employee) {
      throw new AppError(
        'Only authenticated stores can update promotion avatar.',
        401,
      )
    }

    if (!promotion) {
      throw new AppError('Promotion Not Found.', 401)
    }

    if (promotion.avatar) {
      await this.storageProvider.deleteFile(promotion.avatar)
    }

    const filename = await this.storageProvider.saveFile(avatarFilename)

    promotion.avatar = filename

    await this.promotionsRepository.save(promotion)

    return promotion
  }
}

export default UpdatePromotionAvatarService
