import { Controller, Logger } from '@nestjs/common';
import { SkillService } from './skill.service';

@Controller('skill')
export class SkillController {
  private readonly logger = new Logger('SkillController');

  constructor(private SkillService: SkillService) {}
}
