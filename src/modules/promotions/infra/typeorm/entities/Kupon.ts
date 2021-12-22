import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import Promotion from './Promotion'

@Entity('kupons')
class Kupon {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  promotion_id: string

  @ManyToOne(() => Promotion, promotion => promotion.kupon, { eager: true })
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion

  @Column()
  user_id: string

  @Column()
  use_date: Date

  @Column()
  status: string

  @Column()
  kupon_type: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Kupon
