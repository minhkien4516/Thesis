import { Model, Table } from 'sequelize-typescript';

export class Review extends Model {
  id: string;
  comment: string;
  rating: number;
  isActive: boolean;
  isRegistered: boolean;
  createdAt: string;
  updatedAt: string;
}
