import { Inject, Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { databaseToken } from '../../../constants/database.constant';

@Injectable()
export class CorporationService {
  private readonly logger = new Logger('CorporationService');

  constructor(private readonly sequelize: Sequelize) {}
}
