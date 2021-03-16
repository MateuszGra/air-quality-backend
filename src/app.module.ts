import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsModule } from './stations/stations.module';
import { SensorsModule } from './sensors/sensors.module';
import { IndexLevelModule } from './index-level/index-level.module';
import { ValuesModule } from './values/values.module';

@Module({
  imports: [TypeOrmModule.forRoot(), StationsModule, SensorsModule, IndexLevelModule, ValuesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
