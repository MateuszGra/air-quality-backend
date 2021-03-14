import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { SensorsData } from '../interfaces/sensors';
import { StationsEntity } from '../stations/stations.entity';

@Entity()
export class SensorsEntity extends BaseEntity implements SensorsData {
  @PrimaryColumn()
  @Index()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    type: 'int',
  })
  idParam: number;

  @ManyToOne((type) => StationsEntity, (entity) => entity.sensors)
  @JoinColumn()
  station: StationsEntity;
}
