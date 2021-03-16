import { StationsEntity } from '../stations/stations.entity';
import { ValuesEntity } from '../values/values.entity';

export interface SensorsData {
  id: number;
  station: StationsEntity;
  idParam: number;
  values: ValuesEntity[];
}

export type SensorsResp =
  | {
      success: true;
    }
  | {
      success: false;
      errors: string[];
    };
