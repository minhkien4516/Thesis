import { PartialType } from '@nestjs/swagger';
import { AddNewLocationDto } from './addNewLocation.dto';

export class UpdateLocationDto extends PartialType(AddNewLocationDto) {}
