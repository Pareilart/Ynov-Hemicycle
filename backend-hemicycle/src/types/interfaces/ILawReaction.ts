import { Document } from 'mongoose';
import { LawReactionType, LawReactionEmoji } from '../../enum/LawReactionTypeEnum';

export interface ILawReaction extends Document {
    user_id: string;
    law_post_id: string;
    reaction_type: LawReactionType;
    reaction_emoji?: LawReactionEmoji;
    created_at: Date;
    updated_at: Date;
} 