import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class JobService {
  private readonly logger = new Logger('JobService');

  constructor(private readonly sequelize: Sequelize) {}
}
