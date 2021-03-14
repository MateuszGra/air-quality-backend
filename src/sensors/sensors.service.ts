import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SensorsEntity } from './sensors.entity';
import { StationsEntity } from '../stations/stations.entity';

@Injectable()
export class SensorsService {
  async fetchSensors(id) {
    const sensors = await axios
      .get(`https://api.gios.gov.pl/pjp-api/rest/station/sensors/${id}`)
      .then(function (response) {
        return response;
      });
    return sensors.data;
  }

  async saveSensors() {
    const stations: StationsEntity[] = await StationsEntity.find();
    for (const station of stations) {
      const sensors = await this.fetchSensors(station.id);

      for (const sensor of sensors) {
        const sensorExist: SensorsEntity = await SensorsEntity.findOne(
          sensor.id,
        );
        const station: StationsEntity = await StationsEntity.findOne(
          sensor.stationId,
        );

        if (!sensorExist && station) {
          const newSensor = SensorsEntity.create({
            id: sensor.id,
            name: sensor.param.paramName,
            idParam: sensor.param.idParam,
            station: station,
          });
          await newSensor.save();
          console.log(`\x1b[32m`, `CREATE sensor id: ${sensor.id}`);
        }
      }
    }
  }
}
