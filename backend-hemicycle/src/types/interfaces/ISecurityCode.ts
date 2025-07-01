import { Types } from 'mongoose';

export interface ISecurityCode {
  code: string;
  attempts: number;
  expireAt: Date;
  entityId: Types.ObjectId;
  entityType: string; // Le nom du modèle (ex: 'User', 'Depute', etc.)
}
