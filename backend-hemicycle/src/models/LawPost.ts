import mongoose, { Schema } from 'mongoose';
import { ILawPost } from '../types/interfaces/ILawPost';
import { ILawPostReporting } from '../types/interfaces/ILawPostReporting';
import { LawPostReport } from '../enum/LawReactionTypeEnum';

const lawPostSchema = new Schema({
  legislature: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  articleConstitutionnel: {
    type: Number,
    required: true,
  },
  voteType: {
    type: String,
    required: true,
  },
  adopted: {
    type: Boolean,
    required: true,
  },
  dateProposition: {
    type: Date,
    required: true,
  },
  dateAdoption: {
    type: Date,
    required: true,
  },
  voteYes: {
    type: Number,
    required: true,
    default: 0,
  },
  voteNo: {
    type: Number,
    required: true,
    default: 0,
  },
  voteAbstention: {
    type: Number,
    required: true,
    default: 0,
  },
  hasReevaluable: {
    type: Boolean,
    required: true,
    default: false,
  },
  reevaluableCount: {
    type: Number,
    required: true,
    default: 0,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const LawPost = mongoose.model<ILawPost>('LawPost', lawPostSchema);

const lawPostReportingSchema = new Schema<ILawPostReporting>({
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  lawPostId: {
    type: String,
    ref: 'LawPost',
    required: true,
  },
  reason: {
    type: String,
    enum: Object.values(LawPostReport),
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

// Index unique pour s'assurer qu'un utilisateur ne peut signaler qu'une seule fois une publication
lawPostReportingSchema.index({ userId: 1, lawPostId: 1 }, { unique: true });

const LawPostReporting = mongoose.model<ILawPostReporting>('LawPostReporting', lawPostReportingSchema);

export default { LawPost, LawPostReporting };
