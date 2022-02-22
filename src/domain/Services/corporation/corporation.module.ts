import { CorporationService } from './corporation.service';
import { Module } from '@nestjs/common';
import { CorporationController } from './corporation.controller';

@Module({
  controllers: [CorporationController],
  providers: [CorporationService],
})
export class CorporationModule {}
