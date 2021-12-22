import { sign } from 'jsonwebtoken'
import authConfig from '@config/auth'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IEmployeesRepository from '../repositories/IEmployeesRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

import Employee from '../infra/typeorm/entities/Employee'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  employee: Employee
  token: string
}

@injectable()
class AuthenticateEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const employee = await this.employeesRepository.findByEmail(email)

    if (!employee) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      employee.password,
    )

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: employee.id,
      expiresIn,
    })

    return { employee, token }
  }
}

export default AuthenticateEmployeeService
