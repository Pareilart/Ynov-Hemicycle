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

export interface LawPostResponse {
    id: string; // ID MongoDB
    law_id: number; // ID spécifique à la loi
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
    created_at: string;
    updated_at: string;
} 