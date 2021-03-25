import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StationsEntity } from '../stations/stations.entity';

@Entity()
export class IndexLevelEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'datetime',
  })
  @Index()
  date: Date;

  @Column({
    type: 'int',
  })
  indexId: number;

  @ManyToOne((type) => StationsEntity, (entity) => entity.indexLevel)
  @JoinColumn()
  @Index()
  station: StationsEntity;
}
