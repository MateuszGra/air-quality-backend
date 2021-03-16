import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SensorsEntity } from './sensors.entity';
import { StationsEntity } from '../stations/stations.entity';
import { SensorsResp } from '../interfaces/sensors';

@Injectable()
export class SensorsService {
  async fetchSensors(id) {
    try {
      const sensors = await axios
        .get(`https://api.gios.gov.pl/pjp-api/rest/station/sensors/${id}`)
        .then(function (response) {
          return response;
        });
      return {
        success: true,
        items: sensors.data,
      };
    } catch (e) {
      return {
        success: false,
        errors: [e.message],
      };
    }
  }

  async saveSensors(): Promise<SensorsResp> {
    try {
      const stations: StationsEntity[] = await StationsEntity.find();

      for (const station of stations) {
        const sensorsResp = await this.fetchSensors(station.id);

        if (sensorsResp.success === true) {
          for (const sensor of sensorsResp.items) {
            const sensorExist: SensorsEntity = await SensorsEntity.findOne(
              sensor.id,
            );

            if (!sensorExist) {
              const newSensor = SensorsEntity.create({
                id: sensor.id,
                idParam: sensor.param.idParam,
                station: station,
              });
              await newSensor.save();
              console.log(`\x1b[32m`, `CREATE sensor id: ${sensor.id}`);
            }
          }
        }
      }
      return { success: true };
    } catch (e) {
      return {
        success: false,
        errors: [e.message],
      };
    }
  }
}
