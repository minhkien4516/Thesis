import { JobService } from './job.service';
import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { ttlDefault } from '../../../constants/timeout.constant';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          // host: process.env.REDIS_HOST,
          // port: Number(process.env.REDIS_PORT),
          // username: process.env.REDIS_USERNAME,
          // password: process.env.REDIS_PASSWORD,

          host: process.env.REDIS_LOCAL_HOST,
          port: Number(process.env.REDIS_LOCAL_PORT),
          password: process.env.REDIS_LOCAL_PASSWORD,
          ttl: ttlDefault,
        },
      }),
    }),
  ],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
