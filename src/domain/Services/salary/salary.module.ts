import { SalaryService } from './salary.service';
import { Module } from '@nestjs/common';
import { SalaryController } from './salary.controller';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ttlDefault } from '../../../constants/timeout.constant';

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
  ],
  controllers: [SalaryController],
  providers: [SalaryService],
  exports: [SalaryService],
})
export class SalaryModule {}
