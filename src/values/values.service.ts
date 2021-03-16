import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SensorsEntity } from '../sensors/sensors.entity';
import { ValuesEntity } from './values.entity';
import { ValuesResp } from '../interfaces/values';

@Injectable()
export class ValuesService {
  async fetchValues(id) {
    try {
      const values = await axios
        .get(`https://api.gios.gov.pl/pjp-api/rest/data/getData/${id}`)
        .then(function (response) {
          return response;
        });
      return {
        success: true,
        items: values.data.values,
      };
    } catch (e) {
      return {
        success: false,
        errors: [e.message],
      };
    }
  }

  async saveValues(): Promise<ValuesResp> {
    try {
      const sensors = await SensorsEntity.find();

      for (const sensor of sensors) {
        const valueResp = await this.fetchValues(sensor.id);
        if (valueResp.success === true) {
          for (const value of valueResp.items) {
            const valueExist = await ValuesEntity.findOne({
              where: {
                date: value.date,
                sensor,
              },
            });

            if (!valueExist && value.value != null) {
              const newValue = await ValuesEntity.create({
                value: value.value,
                date: value.date,
                sensor,
              });
              await newValue.save();

              console.log(`\x1b[32m`, `CREATE value id: ${newValue.id}`);
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
