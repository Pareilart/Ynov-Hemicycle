import { LawReactionType, LawReactionEmoji } from '../../enum/LawReactionTypeEnum';
import { UserResponse } from './UserResponse';

export interface LawReactionResponse {
  id: string;
  user: UserResponse;
  reaction_type: LawReactionType;
  reaction_emoji?: LawReactionEmoji;
  created_at: string;
  updated_at: string;
}
