import mongoose, { Schema, Model } from 'mongoose';
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
  article_constitutionnel: {
    type: Number,
    required: true,
  },
  vote_type: {
    type: String,
    required: true,
  },
  adopted: {
    type: Boolean,
    required: true,
  },
  date_proposition: {
    type: Date,
    required: true,
  },
  date_adoption: {
    type: Date,
    required: true,
  },
  vote_yes: {
    type: Number,
    required: true,
    default: 0,
  },
  vote_no: {
    type: Number,
    required: true,
    default: 0,
  },
  vote_abstention: {
    type: Number,
    required: true,
    default: 0,
  },
  has_reevaluable: {
    type: Boolean,
    required: true,
    default: false,
  },
  reevaluable_count: {
    type: Number,
    required: true,
    default: 0,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const LawPost = mongoose.model<ILawPost>('LawPost', lawPostSchema);

export default LawPost;
