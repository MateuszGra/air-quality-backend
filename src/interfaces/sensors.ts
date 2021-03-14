import { StationsEntity } from '../stations/stations.entity';

export interface SensorsData {
  id: number;
  station: StationsEntity;
  name: string;
  idParam: number;
}
