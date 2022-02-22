import { Model, Table } from 'sequelize-typescript';

export class Job extends Model {
  id: string;
  title: string;
  description: string;
  date: string;
  numberCandidate: number;
  isActive: boolean;
  isRegistered: boolean;
  createdAt: string;
  updatedAt: string;
}
