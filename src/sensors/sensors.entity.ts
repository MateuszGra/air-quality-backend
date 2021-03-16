import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { SensorsData } from '../interfaces/sensors';
import { StationsEntity } from '../stations/stations.entity';
import { ValuesEntity } from '../values/values.entity';

@Entity()
export class SensorsEntity extends BaseEntity implements SensorsData {
  @PrimaryColumn()
  @Index()
  id: number;

  @Column({
    type: 'int',
  })
  idParam: number;

  @ManyToOne((type) => StationsEntity, (entity) => entity.sensors)
  @JoinColumn()
  station: StationsEntity;

  @OneToMany((type) => ValuesEntity, (entity) => entity.sensor)
  values: ValuesEntity[];
}
