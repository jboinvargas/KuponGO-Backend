import { getRepository, Repository } from 'typeorm'

import IKuponsRepository from '@modules/promotions/repositories/IKuponsRepository'
import ICreateKuponDTO from '@modules/promotions/dtos/ICreateKuponDTO'

import Kupon from '../entities/Kupon'

class KuponsRepository implements IKuponsRepository {
  private ormRepository: Repository<Kupon>

  constructor() {
    this.ormRepository = getRepository(Kupon)
  }

  public async findById(id: string): Promise<Kupon | undefined> {
    const kupon = await this.ormRepository.findOne(id)

    return kupon
  }

  public async findAllKupons(): Promise<Kupon[]> {
    const kupons = await this.ormRepository.find()

    return kupons
  }

  public async findAllUserKupons(user_id: string): Promise<Kupon[]> {
    const kupons = await this.ormRepository.find({ user_id })

    return kupons
  }

  public async findAllAvailableKupons(promotion_id: string): Promise<Kupon[]> {
    const kupons = await this.ormRepository.find({
      promotion_id,
      status: 'available',
    })

    return kupons
  }

  public async create(userData: ICreateKuponDTO): Promise<Kupon> {
    const kupon = this.ormRepository.create(userData)

    await this.ormRepository.save(kupon)

    return kupon
  }

  public async save(kupon: Kupon): Promise<Kupon> {
    return this.ormRepository.save(kupon)
  }
}

export default KuponsRepository
