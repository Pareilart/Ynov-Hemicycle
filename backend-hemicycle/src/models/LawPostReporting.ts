import mongoose, { Schema } from 'mongoose';
import { ILawPostReporting } from '../types/interfaces/ILawPostReporting';
import { LawPostReport } from '../enum/LawReactionTypeEnum';

const LawPostReportingSchema = new Schema<ILawPostReporting>({
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
LawPostReportingSchema.index({ userId: 1, lawPostId: 1 }, { unique: true });
const LawPostReporting = mongoose.model<ILawPostReporting>('LawPostReporting', LawPostReportingSchema);

export default LawPostReporting;
