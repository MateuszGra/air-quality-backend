import { SensorsEntity } from '../sensors/sensors.entity';

export interface ValuesData {
  id: string;
  date: Date;
  sensor: SensorsEntity;
  value: number;
}

export type ValuesResp =
  | {
      success: true;
    }
  | {
      success: false;
      errors: string[];
    };
