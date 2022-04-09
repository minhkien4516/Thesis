import { PartialType } from '@nestjs/swagger';
import { AddNewSalaryDto } from './addNewSalary.dto';

export class UpdateSalaryDto extends PartialType(AddNewSalaryDto) {}
