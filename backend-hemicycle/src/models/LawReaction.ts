import mongoose, { Schema } from 'mongoose';
import { ILawReaction } from '../types/interfaces/ILawReaction';
import { LawReactionType, LawReactionEmoji } from '../enum/LawReactionTypeEnum';

const lawReactionSchema = new Schema<ILawReaction>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lawPostId: {
    type: Schema.Types.ObjectId,
    ref: 'LawPost',
    required: true,
  },
  reactionType: {
    type: String,
    enum: Object.values(LawReactionType),
    required: true,
  },
  reactionEmoji: {
    type: String,
    enum: Object.values(LawReactionEmoji),
    required: false,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

// Index pour empêcher les doublons de réactions par utilisateur sur une même proposition de loi
lawReactionSchema.index({ userId: 1, lawPostId: 1 }, { unique: true });

const LawReaction = mongoose.model<ILawReaction>('LawReaction', lawReactionSchema);

export default LawReaction;
