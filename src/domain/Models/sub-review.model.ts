import { Model } from 'sequelize-typescript';

export class SubReview extends Model {
  id: string;
  content: string;
  reviewId: string;
  rating: number;
  isActive: boolean;
  isRegistered: boolean;
  createdAt?: string;
  updatedAt?: string;
}
