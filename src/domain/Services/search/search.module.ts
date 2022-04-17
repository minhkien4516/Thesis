import { RedisModule } from '@nestjs-modules/ioredis';
import { Module } from '@nestjs/common';
import { ttlDefault } from '../../../constants/timeout.constant';
import { CorporationModule } from '../corporation/corporation.module';
import { FilesModule } from '../files/files.module';
import { JobModule } from '../job/job.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
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
    CorporationModule,
    JobModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
