import { UserResponse } from './UserResponse';
import { LawReactionType, LawReactionEmoji } from '../../enum/LawReactionTypeEnum';

export interface LawReactionResponse {
  id: string;
  user: UserResponse;
  reactionType: LawReactionType;
  reactionEmoji?: LawReactionEmoji;
  createdAt: string;
  updatedAt: string;
}

export interface ReactionStats {
  total: number;
  types: {
    [key in LawReactionType]: number;
  };
  emojis: {
    [key in LawReactionEmoji]: number;
  };
}

export interface LawPostResponse {
  id: string; // ID MongoDB
  legislature: number;
  title: string;
  articleConstitutionnel: number;
  voteType: string;
  adopted: boolean;
  dateProposition: string;
  dateAdoption: string;
  voteYes: number;
  voteNo: number;
  voteAbstention: number;
  hasReevaluable: boolean;
  reevaluableCount: number;
  user?: UserResponse;
  reactions?: LawReactionResponse[];
  reactionsStats: ReactionStats;
  createdAt: string;
  updatedAt: string;
}
