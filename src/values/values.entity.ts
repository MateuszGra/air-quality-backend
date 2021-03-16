import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ValuesData } from '../interfaces/values';
import { SensorsEntity } from '../sensors/sensors.entity';

@Entity()
export class ValuesEntity extends BaseEntity implements ValuesData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'datetime',
  })
  @Index()
  date: Date;

  @Column({
    type: 'double',
  })
  value: number;

  @ManyToOne((type) => SensorsEntity, (entity) => entity.values)
  @JoinColumn()
  @Index()
  sensor: SensorsEntity;
}
