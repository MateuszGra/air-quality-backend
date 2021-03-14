import { StationsEntity } from '../stations/stations.entity';

export interface IndexLevelData {
  id: string;
  date: Date;
  station: StationsEntity;
  indexId: number;
  indexLevelName: string | null;
}
