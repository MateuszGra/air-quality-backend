import { SensorsEntity } from '../sensors/sensors.entity';

export interface StationsData {
  id: number;
  name: string;
  gegrLat: number;
  gegrLon: number;
  sensors: SensorsEntity[];
}

export type StationsResp =
  | {
      success: true;
      count?: number;
      items?: SensorsEntity[];
    }
  | {
      success: false;
      errors: string[];
    };
