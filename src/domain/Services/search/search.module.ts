import { Module } from '@nestjs/common';
import { RedisModule } from '@svtslv/nestjs-ioredis';
import { ttlDefault } from '../../../constants/timeout.constant';
import { FilesModule } from '../files/files.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
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
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
