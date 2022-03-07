import { PartialType } from '@nestjs/swagger';
import { AddNewJobDto } from './addNewJob.dto';

export class UpdateJobDto extends PartialType(AddNewJobDto) {}
