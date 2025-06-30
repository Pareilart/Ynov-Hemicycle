import mongoose from 'mongoose';
import { IVotingSurvey } from '../types/interfaces/IVotingSurvey';
import { VotingFrequencyEnum } from '../enum/VotingFrequencyEnum';
import { ElectoralRegistrationEnum } from '../enum/ElectoralRegistrationEnum';
import { PoliticalPositioningEnum } from '../enum/PoliticalPositioningEnum';
import { PoliticalProximityEnum } from '../enum/PoliticalProximityEnum';

const votingSurveySchema = new mongoose.Schema<IVotingSurvey>({
    voting_frequency: {
        type: String,
        enum: Object.values(VotingFrequencyEnum),
        required: true
    },
    electoral_registration: {
        type: String,
        enum: Object.values(ElectoralRegistrationEnum),
        required: true
    },
    positioning: {
        type: String,
        enum: Object.values(PoliticalPositioningEnum),
        required: true
    },
    proximity: {
        type: String,
        enum: Object.values(PoliticalProximityEnum),
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

export default mongoose.model<IVotingSurvey>('VotingSurvey', votingSurveySchema); 