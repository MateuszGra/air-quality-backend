export interface StationsData {
  id: number;
  name: string;
  gegrLat: number;
  gegrLon: number;
}

export type StationsResp =
  | {
      success: true;
      count?: number;
      items?: any;
    }
  | {
      success: false;
      errors: string[];
    };
