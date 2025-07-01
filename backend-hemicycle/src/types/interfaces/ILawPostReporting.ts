import { Document, Types } from 'mongoose';
import { LawPostReport } from '../../enum/LawReactionTypeEnum';

export interface ILawPostReporting extends Document {
  _id: Types.ObjectId;
  userId: string;
  lawPostId: string;
  reason: LawPostReport;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
