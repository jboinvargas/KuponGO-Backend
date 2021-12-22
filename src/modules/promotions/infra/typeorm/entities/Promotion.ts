import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import uploadConfig from '@config/upload'
import Store from '@modules/stores/infra/typeorm/entities/Store'
import { Expose } from 'class-transformer'
import Kupon from './Kupon'

@Entity('promotions')
class Promotion {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  employee_id: string

  @Column()
  store_id: string

  @ManyToOne(() => Store, store => store.promotion, { eager: true })
  @JoinColumn({ name: 'store_id' })
  store: Store

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  start_time: Date

  @Column()
  finish_time: Date

  @Column('decimal', { scale: 2 })
  product_price: number

  @Column('decimal', { scale: 2 })
  product_discount: number

  @Column()
  quantity: number

  @Column()
  used_quantity: number

  @OneToMany(() => Kupon, kupon => kupon.promotion)
  kupon: Kupon

  @Column()
  avatar: string

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

export default Promotion
