import { VotingFrequencyEnum } from '../../enum/VotingFrequencyEnum';
import { ElectoralRegistrationEnum } from '../../enum/ElectoralRegistrationEnum';
import { PoliticalPositioningEnum } from '../../enum/PoliticalPositioningEnum';
import { PoliticalProximityEnum } from '../../enum/PoliticalProximityEnum';

export interface VotingSurveyResponse {
  id: string;
  votingFrequency: VotingFrequencyEnum;
  electoralRegistration: ElectoralRegistrationEnum;
  positioning: PoliticalPositioningEnum;
  proximity: PoliticalProximityEnum;
  createdAt: string;
  updatedAt: string;
}
