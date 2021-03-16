import { StationsEntity } from '../stations/stations.entity';

export interface SensorsData {
  id: number;
  station: StationsEntity;
  idParam: number;
}

export type SensorsResp =
  | {
      success: true;
    }
  | {
      success: false;
      errors: string[];
    };
