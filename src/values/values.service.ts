import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ValuesResp } from '../interfaces/values';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Values } from '../schemas/values.schema';
import { Sensors } from '../schemas/sensors.schema';

@Injectable()
export class ValuesService {
  constructor(
    @InjectModel(Sensors.name)
    private SensorsModel: Model<Sensors>,
    @InjectModel(Values.name)
    private ValuesModel: Model<Values>,
  ) {}

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
      const sensors = await this.SensorsModel.find();

      for (const sensor of sensors) {
        const valueResp = await this.fetchValues(sensor.id);
        if (valueResp.success === true) {
          for (const value of valueResp.items) {
            const valueExist = await this.ValuesModel.findOne({
              date: value.date,
              sensor: sensor._id,
            }).exec();

            if (!valueExist && value.value != null) {
              const newValue = await this.ValuesModel.create({
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
