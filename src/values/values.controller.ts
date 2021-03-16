import { Controller, Get, Inject } from '@nestjs/common';
import { ValuesService } from './values.service';
import { ValuesResp } from '../interfaces/values';

@Controller('values')
export class ValuesController {
  constructor(@Inject(ValuesService) private valuesService: ValuesService) {}

  @Get('/import')
  async import(): Promise<ValuesResp> {
    return await this.valuesService.saveValues();
  }
}
