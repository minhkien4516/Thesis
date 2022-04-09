import { LocationService } from './location.service';
import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
          username: process.env.REDIS_USERNAME,
          password: process.env.REDIS_PASSWORD,

          // host: 'localhost',
          // port: 6379,
          // ttl: ttlDefault,
        },
      }),
    }),
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
