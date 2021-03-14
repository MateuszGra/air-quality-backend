import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StationsModule } from './stations/stations.module';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  imports: [TypeOrmModule.forRoot(), StationsModule, SensorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
