import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IEmployeesRepository from '@modules/stores/repositories/IEmployeesRepository'
import { format } from 'date-fns'
import Kupon from '../infra/typeorm/entities/Kupon'
import IKuponsRepository from '../repositories/IKuponsRepository'
import IPromotionsRepository from '../repositories/IPromotionsRepository'

interface IRequest {
  kupon_id: string
  employee_id: string
}

@injectable()
class ConfirmKuponService {
  constructor(
    @inject('KuponsRepository')
    private kuponsRepository: IKuponsRepository,

    @inject('PromotionsRepository')
    private promotionsRepository: IPromotionsRepository,

    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute({ kupon_id, employee_id }: IRequest): Promise<Kupon> {
    const employee = await this.employeesRepository.findById(employee_id)
    const kupon = await this.kuponsRepository.findById(kupon_id)

    if (!kupon) {
      throw new AppError('Kupon not found.', 404)
    }

    const promotion = await this.promotionsRepository.findById(
      kupon.promotion_id,
    )

    if (!promotion) {
      throw new AppError('Promotion not found.', 404)
    }

    if (!employee) {
      throw new AppError('Only authenticated stores can confirm Kupon.', 401)
    }

    if (kupon.promotion.store_id !== employee.store_id) {
      throw new AppError(`Only your store Kupons can confirmed`, 401)
    }

    if (kupon.status === 'out_stock') {
      throw new AppError(`Out of stock for this promotion`, 401)
    }

    if (kupon.status === 'used') {
      throw new AppError(
        `Kupon ká foi utilizado no dia ${format(
          new Date(kupon.use_date),
          "dd/MM/yyyy 'às' HH:mm'h'",
        )}.`,
        401,
      )
    }

    if (promotion.used_quantity >= promotion.quantity) {
      const kupons = await this.kuponsRepository.findAllAvailableKupons(
        kupon.promotion_id,
      )

      kupons.map(async (kuponOutStock: Kupon) => {
        // eslint-disable-next-line no-param-reassign
        kuponOutStock.status = 'out_stock'
        await this.kuponsRepository.save(kuponOutStock)
        return kuponOutStock
      })

      throw new AppError(`Out of stock for this promotion.`, 401)
    }

    kupon.status = 'used'
    kupon.use_date = new Date(Date.now())

    promotion.used_quantity += 1

    await this.promotionsRepository.save(promotion)

    await this.kuponsRepository.save(kupon)

    return kupon
  }
}

export default ConfirmKuponService
