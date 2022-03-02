import { Controller, Logger } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  private readonly logger = new Logger('LocationController');

  constructor(private LocationService: LocationService) {}
}
