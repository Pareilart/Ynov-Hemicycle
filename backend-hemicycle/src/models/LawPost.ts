import mongoose, { Schema } from 'mongoose';
import { ILawPost } from '../types/interfaces/ILawPost';

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
  lawPostReporting: {
    type: Schema.Types.ObjectId,
    ref: 'LawPostReporting',
    required: false,
  },
}, {
  timestamps: true,
});

const LawPost = mongoose.model<ILawPost>('LawPost', lawPostSchema);

export default LawPost;
