import { PartialType } from '@nestjs/swagger';
import { AddNewEmployeeDto } from './addNewEmployee.dto';

export class UpdateEmployeeDto extends PartialType(AddNewEmployeeDto) {}
