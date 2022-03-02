import { JobService } from './Job.service';
import { Module } from '@nestjs/common';
import { JobController } from './Job.controller';

@Module({
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}
