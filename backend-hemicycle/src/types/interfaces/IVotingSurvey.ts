import { Document } from 'mongoose';
import { VotingFrequencyEnum } from '../../enum/VotingFrequencyEnum';
import { ElectoralRegistrationEnum } from '../../enum/ElectoralRegistrationEnum';
import { PoliticalPositioningEnum } from '../../enum/PoliticalPositioningEnum';
import { PoliticalProximityEnum } from '../../enum/PoliticalProximityEnum';

export interface IVotingSurvey extends Document {
  voting_frequency: VotingFrequencyEnum;
  electoral_registration: ElectoralRegistrationEnum;
  positioning: PoliticalPositioningEnum;
  proximity: PoliticalProximityEnum;
  created_at: Date;
  updated_at: Date;
}
