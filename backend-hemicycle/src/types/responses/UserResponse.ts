import { RoleResponse } from './RoleResponse';
import { AddressesResponse } from './AddressesResponse';
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
}

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string;
  birthday?: Date;
  sexe?: 'Homme' | 'Femme' | 'Autre';
  email: string;
  emailVerifiedAt?: Date;
  role?: RoleResponse;
  addresses?: AddressesResponse;
  token? : {
    token : string;
    refreshToken : string;
    expiresIn : number;
    exp : number;
  };
  votingSurvey?: VotingSurveyResponse;
  hasOnBoarding: boolean;
}
