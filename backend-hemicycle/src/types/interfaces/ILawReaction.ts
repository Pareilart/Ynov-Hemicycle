import { Document, Types } from 'mongoose';
import { LawReactionType, LawReactionEmoji } from '../../enum/LawReactionTypeEnum';

export interface ILawReaction extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  user_id: Types.ObjectId;
  lawPost: Types.ObjectId;
  law_post_id: Types.ObjectId;
  reaction_type: LawReactionType;
  reaction_emoji?: LawReactionEmoji;
  createdAt: Date;
  updatedAt: Date;
}
