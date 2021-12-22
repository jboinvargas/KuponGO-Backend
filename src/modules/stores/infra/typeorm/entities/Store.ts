import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'

import uploadConfig from '@config/upload'
import { Expose } from 'class-transformer'
import Promotion from '@modules/promotions/infra/typeorm/entities/Promotion'

@Entity('stores')
class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column('decimal', { precision: 10, scale: 2 })
  latitude: number

  @Column('decimal', { precision: 10, scale: 2 })
  longitude: number

  @Column()
  cnpj: string

  @Column()
  zip_code: string

  @Column()
  state: string

  @Column()
  city: string

  @Column()
  district: string

  @Column()
  street: string

  @Column()
  number: string

  @Column()
  phone: string

  @Column()
  status: string

  @Column()
  opening_hours: string

  @Column()
  avatar: string

  @OneToMany(() => Promotion, promotion => promotion.store)
  promotion: Promotion

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @Expose({ name: 'avatar_url' })
  getAvatar_url(): string | null {
    if (!this.avatar) {
      return null
    }

    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.avatar}`
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`
      default:
        return null
    }
  }
}

export default Store
