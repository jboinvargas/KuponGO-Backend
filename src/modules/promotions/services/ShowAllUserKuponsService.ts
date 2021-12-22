import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IKuponsRepository from '../repositories/IKuponsRepository'

import Kupon from '../infra/typeorm/entities/Kupon'

interface IRequest {
  user_id: string
}

@injectable()
class ShowAllUserKuponsService {
  constructor(
    @inject('KuponsRepository')
    private kuponsRepository: IKuponsRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Kupon[]> {
    const UserKupons = await this.kuponsRepository.findAllUserKupons(user_id)

    if (!UserKupons) {
      throw new AppError('Store promotions not found')
    }

    return UserKupons
  }
}

export default ShowAllUserKuponsService
