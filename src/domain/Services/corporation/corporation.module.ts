import { CorporationService } from './corporation.service';
import { Module } from '@nestjs/common';
import { CorporationController } from './corporation.controller';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { ttlDefault } from '../../../constants/timeout.constant';
import { FilesModule } from '../files/files.module';
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
    FilesModule,
  ],
  controllers: [CorporationController],
  providers: [CorporationService],
})
export class CorporationModule {}
