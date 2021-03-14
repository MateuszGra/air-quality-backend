import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';
import { stationsData } from '../interfaces/stations';

@Entity()
export class StationsEntity extends BaseEntity implements stationsData {
  @PrimaryColumn()
  @Index()
  id: number;

  @Column({
    length: 100,
  })
  name: string;
}
