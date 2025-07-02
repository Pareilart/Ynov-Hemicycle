import { LawReactionType, LawReactionEmoji } from '../../enum/LawReactionTypeEnum';
import { UserResponse } from './UserResponse';

export interface LawReactionResponse {
  id: string;
  user: UserResponse;
  reactionType: LawReactionType;
  reactionEmoji?: LawReactionEmoji;
  createdAt: string;
  updatedAt: string;
}
