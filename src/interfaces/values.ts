import { Types } from 'mongoose';

export interface ValuesData {
  date: Date;
  sensor: Types.ObjectId;
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
