import { Model } from 'sequelize-typescript';

export class Salary extends Model {
  id: string;
  gt: number;
  lt: number;
  unit: string;
  isActive: boolean;
  isRegistered: boolean;
  createdAt: string;
  updatedAt: string;
}
