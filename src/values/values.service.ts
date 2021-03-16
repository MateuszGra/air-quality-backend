import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ValuesService {
  async fetchValues(id) {
    try {
      const sensors = await axios
        .get(`https://api.gios.gov.pl/pjp-api/rest/data/getData/${id}`)
        .then(function (response) {
          return response;
        });
      return {
        success: true,
        items: sensors.data.values,
      };
    } catch (e) {
      return {
        success: false,
        errors: [e.message],
      };
    }
  }
}
