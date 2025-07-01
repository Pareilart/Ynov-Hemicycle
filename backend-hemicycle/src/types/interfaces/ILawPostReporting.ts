import { Document } from 'mongoose';
import { LawPostReport } from '../../enum/LawReactionTypeEnum';

export interface ILawPostReporting extends Document {
  userId: string;
  lawPostId: string;
  reason: LawPostReport;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
