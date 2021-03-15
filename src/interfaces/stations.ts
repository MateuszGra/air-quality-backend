import { SensorsEntity } from '../sensors/sensors.entity';

export interface StationsData {
  id: number;
  name: string;
  gegrLat: number;
  gegrLon: number;
  sensors: SensorsEntity[];
}
