import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class AddNewSkillDto {
  @IsString()
  @IsNotEmpty()
  name?: string | null;

  @IsString()
  @IsNotEmpty()
  level?: string | null;

  @IsString()
  @IsNotEmpty()
  position?: string | null;

  @IsString()
  @IsOptional()
  slug?: string | null;
}

export class AddNewSkillsDto {
  skills: [AddNewSkillDto];
}
