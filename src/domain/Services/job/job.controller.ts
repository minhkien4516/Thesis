import { Controller, Logger } from '@nestjs/common';
import { JobService } from './Job.service';

@Controller('job')
export class JobController {
  private readonly logger = new Logger('JobController');

  constructor(private JobService: JobService) {}
}
