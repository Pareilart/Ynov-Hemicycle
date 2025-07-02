import { Document, Types } from 'mongoose';
import { LawReactionType, LawReactionEmoji } from '../../enum/LawReactionTypeEnum';

export interface ILawReaction extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  userId: Types.ObjectId;
  lawPost: Types.ObjectId;
  lawPostId: Types.ObjectId;
  reactionType: LawReactionType;
  reactionEmoji?: LawReactionEmoji;
  createdAt: Date;
  updatedAt: Date;
}
