import mongoose, { Schema } from 'mongoose';
import { ILawReaction } from '../types/interfaces/ILawReaction';
import { LawReactionType, LawReactionEmoji } from '../enum/LawReactionTypeEnum';

const lawReactionSchema = new Schema<ILawReaction>({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    law_post_id: {
        type: Schema.Types.ObjectId,
        ref: 'LawPost',
        required: true
    },
    reaction_type: {
        type: String,
        enum: Object.values(LawReactionType),
        required: true
    },
    reaction_emoji: {
        type: String,
        enum: Object.values(LawReactionEmoji),
        required: false
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Index pour empêcher les doublons de réactions par utilisateur sur une même proposition de loi
lawReactionSchema.index({ user_id: 1, law_post_id: 1 }, { unique: true });

const LawReaction = mongoose.model<ILawReaction>('LawReaction', lawReactionSchema);

export default LawReaction; 