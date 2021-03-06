import { Types } from 'mongoose';

export interface IndexLevelData {
  date: Date;
  index: number;
  station: Types.ObjectId;
}

export type IndexLevelResp =
  | {
      success: true;
    }
  | {
      success: false;
      errors: string[];
    };
