import { JobService } from './Job.service';
import { Module } from '@nestjs/common';
import { JobController } from './Job.controller';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { ttlDefault } from '../../../constants/timeout.constant';
import { CorporationModule } from '../corporation/corporation.module';
import { LocationModule } from '../location/location.module';
import { SkillModule } from '../skill/skill.module';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          // host: process.env.REDIS_HOST,
          // port: Number(process.env.REDIS_PORT),
          // username: process.env.REDIS_USERNAME,
          // password: process.env.REDIS_PASSWORD,

          host: 'localhost',
          port: 6379,
          ttl: ttlDefault,
        },
      }),
    }),
    CorporationModule,
    LocationModule,
    SkillModule,
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
