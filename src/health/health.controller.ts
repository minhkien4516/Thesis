import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  SequelizeHealthIndicator,
} from '@nestjs/terminus';
import { timeDefault } from '../constants/timeout.constant';

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthCheckService,
    private readonly db: SequelizeHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiTags('Health')
  check() {
    return this.healthService.check([
      async () => this.db.pingCheck('database', { timeout: timeDefault }),
    ]);
  }
}
