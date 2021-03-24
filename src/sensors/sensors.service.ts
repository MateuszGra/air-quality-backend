import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { SensorsResp } from '../interfaces/sensors';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sensors } from '../schemas/sensors.schema';
import { StationsService } from '../stations/stations.service';
import { StationsResp } from '../interfaces/stations';

@Injectable()
export class SensorsService {
  constructor(
    @InjectModel(Sensors.name)
    private SensorsModel: Model<Sensors>,
    @Inject(StationsService) private stationsService: StationsService,
  ) {}

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
      const stationsResp: StationsResp = await this.stationsService.showAll();
      if (stationsResp.success === false) throw new Error('Stations not found');

      for (const station of stationsResp.items) {
        const sensorsResp = await this.fetchSensors(station.id);

        if (sensorsResp.success === true) {
          for (const sensor of sensorsResp.items) {
            const sensorExist = await this.SensorsModel.findOne({
              id: sensor.id,
            });

            if (!sensorExist) {
              const newSensor = await this.SensorsModel.create({
                id: sensor.id,
                idParam: sensor.param.idParam,
                idStation: station.id,
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
