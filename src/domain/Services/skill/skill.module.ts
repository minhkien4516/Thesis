import { SkillService } from './skill.service';
import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ttlDefault } from '../../../constants/timeout.constant';

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
  controllers: [SkillController],
  providers: [SkillService],
  exports: [SkillService],
})
export class SkillModule {}
