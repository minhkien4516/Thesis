import { CorporationService } from './corporation.service';
import { Module } from '@nestjs/common';
import { CorporationController } from './corporation.controller';
import { ttlDefault } from '../../../constants/timeout.constant';
import { FilesModule } from '../files/files.module';
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
    FilesModule,
  ],
  controllers: [CorporationController],
  providers: [CorporationService],
  exports: [CorporationService],
})
export class CorporationModule {}
