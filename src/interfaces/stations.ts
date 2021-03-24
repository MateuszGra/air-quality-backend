import { Stations } from '../schemas/stations.schema';

export interface StationsData {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export type StationsResp =
  | {
      success: true;
      count?: number;
      items?: Stations[];
    }
  | {
      success: false;
      errors: string[];
    };
