export interface SensorsData {
  id: number;
  idParam: number;
  idStation: number;
}

export type SensorsResp =
  | {
      success: true;
    }
  | {
      success: false;
      errors: string[];
    };
