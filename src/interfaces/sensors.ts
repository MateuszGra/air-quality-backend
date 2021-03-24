import { Sensors } from '../schemas/sensors.schema';

export interface SensorsData {
  id: number;
  idParam: number;
  idStation: number;
}

export type SensorsResp =
  | {
      success: true;
      count?: number;
      items?: Sensors[];
    }
  | {
      success: false;
      errors: string[];
    };
