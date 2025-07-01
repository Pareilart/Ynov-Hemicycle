import { VotingFrequencyEnum } from '../../enum/VotingFrequencyEnum';
import { ElectoralRegistrationEnum } from '../../enum/ElectoralRegistrationEnum';
import { PoliticalPositioningEnum } from '../../enum/PoliticalPositioningEnum';
import { PoliticalProximityEnum } from '../../enum/PoliticalProximityEnum';

export interface VotingSurveyResponse {
  id: string;
  voting_frequency: VotingFrequencyEnum;
  electoral_registration: ElectoralRegistrationEnum;
  positioning: PoliticalPositioningEnum;
  proximity: PoliticalProximityEnum;
  created_at: string;
  updated_at: string;
}
