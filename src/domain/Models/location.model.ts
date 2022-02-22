import { Model, Table } from 'sequelize-typescript';

export class Location extends Model {
  id: string;
  country: string;
  city: string;
  district: string;
  ward: string;
  street: string;
  details: string;
  isActive: boolean;
  isRegistered: boolean;
  createdAt: string;
  updatedAt: string;
}
