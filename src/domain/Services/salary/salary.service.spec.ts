import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import databaseConfig from '../../../database/database.config';
import { DatabaseModule } from '../../../database/database.module';
import { SalaryService } from './salary.service';

describe('SalaryService', () => {
  let service: SalaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalaryService],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.development', '.env.production', '.env'],
          isGlobal: true,
          load: [databaseConfig],
        }),
        DatabaseModule,
      ],
    }).compile();

    service = module.get<SalaryService>(SalaryService);
  });
});
