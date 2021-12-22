import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IEmployeesRepository from '@modules/stores/repositories/IEmployeesRepository'
import Kupon from '../infra/typeorm/entities/Kupon'
import IKuponsRepository from '../repositories/IKuponsRepository'

interface IRequest {
  kupon_id: string
  employee_id: string
}

@injectable()
class ShowKuponService {
  constructor(
    @inject('KuponsRepository')
    private kuponsRepository: IKuponsRepository,

    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute({ kupon_id, employee_id }: IRequest): Promise<Kupon> {
    const employee = await this.employeesRepository.findById(employee_id)
    const kupon = await this.kuponsRepository.findById(kupon_id)
    console.log(kupon)

    if (!kupon) {
      throw new AppError('Kupon not found')
    }

    if (!employee) {
      throw new AppError('Only authenticated stores can see Kupon.', 401)
    }

    if (kupon.promotion.store_id !== employee.store_id) {
      throw new AppError(`Only your store's kupons can be seen`, 401)
    }

    return kupon
  }
}

export default ShowKuponService
