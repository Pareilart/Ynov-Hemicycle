import { RoleResponse } from './RoleResponse';
import { AddressResponse } from './AddressResponse';
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
}

export interface UserResponse {
  id: string;
  firstname: string;
  lastname: string;
  birthday?: Date;
  sexe?: 'Homme' | 'Femme' | 'Autre';
  email: string;
  emailVerifiedAt?: Date;
  role?: RoleResponse;
  address?: AddressResponse;
  token? : {
    token : string;
    refreshToken : string;
    expiresIn : number;
    exp : number;
  };
  votingSurvey?: VotingSurveyResponse;
  hasOnBoarding: boolean;
  twoFactorEnabled: boolean;
}
