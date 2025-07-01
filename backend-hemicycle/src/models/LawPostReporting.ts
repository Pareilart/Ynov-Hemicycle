import mongoose, { Schema } from 'mongoose';
import { ILawPostReporting } from '../types/interfaces/ILawPostReporting';
import { LawPostReport } from '../enum/LawReactionTypeEnum';

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

export default LawPostReporting;
