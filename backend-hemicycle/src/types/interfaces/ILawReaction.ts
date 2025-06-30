import { Document, Types } from 'mongoose';
import { LawReactionType, LawReactionEmoji } from '../../enum/LawReactionTypeEnum';

export interface ILawReaction extends Document {
    user_id: Types.ObjectId;
    law_post_id: Types.ObjectId;
    reaction_type: LawReactionType;
    reaction_emoji?: LawReactionEmoji;
    created_at: Date;
    updated_at: Date;
} 