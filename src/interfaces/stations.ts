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
      items?: any;
    }
  | {
      success: false;
      errors: string[];
    };
