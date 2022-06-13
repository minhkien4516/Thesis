import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import databaseConfig from '../../../database/database.config';
import { DatabaseModule } from '../../../database/database.module';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let service: EmployeeService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.development', '.env.production', '.env'],
          isGlobal: true,
          load: [databaseConfig],
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });
});
