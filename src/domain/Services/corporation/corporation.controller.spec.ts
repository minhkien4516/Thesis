import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../../database/database.module';
import { CorporationController } from './corporation.controller';
import { CorporationService } from './corporation.service';

describe('BasketController', () => {
  let controller: CorporationController;
  let service: CorporationService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CorporationController],
      providers: [CorporationService],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.development', '.env.production', '.env'],
          isGlobal: true,
        }),
        DatabaseModule,
      ],
    }).compile();

    controller = module.get<CorporationController>(CorporationController);
    service = module.get<CorporationService>(CorporationService);
  });
});
