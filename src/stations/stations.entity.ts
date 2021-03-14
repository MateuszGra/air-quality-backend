import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { StationsData } from '../interfaces/stations';
import { SensorsEntity } from '../sensors/sensors.entity';

@Entity()
export class StationsEntity extends BaseEntity implements StationsData {
  @PrimaryColumn()
  @Index()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @OneToMany((type) => SensorsEntity, (entity) => entity.station)
  sensors: SensorsEntity[];
}
