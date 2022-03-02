import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class SkillService {
  private readonly logger = new Logger('SkillService');

  constructor(private readonly sequelize: Sequelize) {}
}
