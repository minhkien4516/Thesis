import { PartialType } from '@nestjs/swagger';
import { AddNewCorporationDto } from './addNewCorporation.dto';

export class UpdateCorporationDto extends PartialType(AddNewCorporationDto) {}
