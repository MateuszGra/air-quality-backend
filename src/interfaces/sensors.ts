import { Sensors } from '../schemas/sensors.schema';
import { Types } from 'mongoose';

export interface SensorsData {
  id: number;
  param: number;
  station: Types.ObjectId;
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
