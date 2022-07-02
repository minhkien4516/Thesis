import { EmployeeService } from './employee.service';
import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { ttlDefault } from '../../../constants/timeout.constant';
import { RedisModule } from '@nestjs-modules/ioredis';
import { JobModule } from '../job/job.module';
import { CorporationModule } from '../corporation/corporation.module';
import { FilesModule } from '../files/files.module';
import { UniversityModule } from '../university/university.module';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          username: process.env.REDIS_USERNAME,
          password: process.env.REDIS_PASSWORD,

          // host: process.env.REDIS_LOCAL_HOST,
          // port: Number(process.env.REDIS_LOCAL_PORT),
          // password: process.env.REDIS_LOCAL_PASSWORD,
          // ttl: ttlDefault,
        },
      }),
    }),
    FilesModule,
    JobModule,
    CorporationModule,
    UniversityModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
