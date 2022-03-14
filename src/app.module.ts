import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { CorporationModule } from './domain/Services/corporation/corporation.module';
import { HealthModule } from './health/health.module';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import databaseConfig from './database/database.config';
import { JobModule } from './domain/Services/job/job.module';
import { LocationModule } from './domain/Services/location/location.module';
import { SkillModule } from './domain/Services/skill/skill.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production', '.env'],
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
    HealthModule,
    CorporationModule,
    JobModule,
    LocationModule,
    SkillModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
