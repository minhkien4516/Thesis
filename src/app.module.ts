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
import { SearchModule } from './domain/Services/search/search.module';
import { SalaryModule } from './domain/Services/salary/salary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production', '.env'],
      isGlobal: true,
      load: [databaseConfig],
    }),
    HealthModule,
    DatabaseModule,
    CorporationModule,
    JobModule,
    LocationModule,
    SkillModule,
    SalaryModule,
    SearchModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule {}
