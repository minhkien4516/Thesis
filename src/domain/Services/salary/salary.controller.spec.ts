import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import databaseConfig from '../../../database/database.config';
import { DatabaseModule } from '../../../database/database.module';
import { SalaryController } from './salary.controller';
import { SalaryService } from './salary.service';

describe('SalaryController', () => {
  let controller: SalaryController;
  let service: SalaryService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalaryController],
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

    controller = module.get<SalaryController>(SalaryController);
    service = module.get<SalaryService>(SalaryService);
  });
});
