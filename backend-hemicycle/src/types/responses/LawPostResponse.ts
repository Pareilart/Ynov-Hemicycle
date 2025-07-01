import { UserResponse } from './UserResponse';
import { LawReactionType, LawReactionEmoji } from '../../enum/LawReactionTypeEnum';

export interface LawReactionResponse {
  id: string;
  user: UserResponse;
  reaction_type: LawReactionType;
  reaction_emoji?: LawReactionEmoji;
  created_at: string;
  updated_at: string;
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
  article_constitutionnel: number;
  vote_type: string;
  adopted: boolean;
  date_proposition: string;
  date_adoption: string;
  vote_yes: number;
  vote_no: number;
  vote_abstention: number;
  has_reevaluable: boolean;
  reevaluable_count: number;
  user: UserResponse;
  reactions?: LawReactionResponse[];
  reactions_stats: ReactionStats;
  createdAt: string;
  updatedAt: string;
}
