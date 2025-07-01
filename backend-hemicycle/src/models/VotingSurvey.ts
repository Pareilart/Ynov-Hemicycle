import mongoose from 'mongoose';
import { IVotingSurvey } from '../types/interfaces/IVotingSurvey';
import { VotingFrequencyEnum } from '../enum/VotingFrequencyEnum';
import { ElectoralRegistrationEnum } from '../enum/ElectoralRegistrationEnum';
import { PoliticalPositioningEnum } from '../enum/PoliticalPositioningEnum';
import { PoliticalProximityEnum } from '../enum/PoliticalProximityEnum';

const votingSurveySchema = new mongoose.Schema<IVotingSurvey>({
  votingFrequency: {
    type: String,
    enum: Object.values(VotingFrequencyEnum),
    required: true,
  },
  electoralRegistration: {
    type: String,
    enum: Object.values(ElectoralRegistrationEnum),
    required: true,
  },
  positioning: {
    type: String,
    enum: Object.values(PoliticalPositioningEnum),
    required: true,
  },
  proximity: {
    type: String,
    enum: Object.values(PoliticalProximityEnum),
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export default mongoose.model<IVotingSurvey>('VotingSurvey', votingSurveySchema);
