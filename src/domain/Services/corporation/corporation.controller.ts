import { Controller, Logger } from '@nestjs/common';
import { CorporationService } from './corporation.service';

@Controller('baskets')
export class CorporationController {
  private readonly logger = new Logger('CorporationController');

  constructor(private corporationService: CorporationService) {}
}
