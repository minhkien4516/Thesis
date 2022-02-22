import { Model, Table } from 'sequelize-typescript';

export class Corporation extends Model {
  id: string;
  name: string;
  hotline: string | number;
  email: string;
  presenterId: string;
  overtimeRequire: string;
  special: string;
  startWorkTime: string;
  endWorkTime: string;
  origin: string;
  numberEmployees: number;
  slug: string;
  isActive: boolean;
  isRegistered: boolean;
  createdAt: string;
  updatedAt: string;
}
