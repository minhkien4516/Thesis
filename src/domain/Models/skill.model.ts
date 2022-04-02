import { Model } from 'sequelize-typescript';

export class Skill extends Model {
  id: string;
  name: string;
  level: string;
  position: string;
  slug: string;
  isActive: boolean;
  isRegistered: boolean;
  createdAt: string;
  updatedAt: string;
}
