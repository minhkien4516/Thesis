import { Injectable, Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ReviewService {
  private readonly logger = new Logger('ReviewService');

  constructor(private readonly sequelize: Sequelize) {}
}
