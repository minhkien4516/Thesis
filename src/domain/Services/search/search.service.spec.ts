import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../../database/database.module';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService],
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.development', '.env.production', '.env'],
          isGlobal: true,
        }),
        DatabaseModule,
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });
});
