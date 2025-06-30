import { LawPostResponse } from '../responses/LawPostResponse';
import { UserResponse } from '../responses/UserResponse';
import { LawReactionEmoji, LawReactionType } from '../../enum/LawReactionTypeEnum';

export class LawPostDto {
    private static createUserResponse(user: any): UserResponse {
        return {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            hasOnBoarding: user.hasOnBoarding || false
        };
    }

    private static transformReaction(reaction: any) {
        return {
            id: reaction._id.toString(),
            user: this.createUserResponse(reaction.user_id),
            reaction_type: reaction.reaction_type,
            reaction_emoji: reaction.reaction_emoji,
            created_at: reaction.createdAt?.toISOString() || new Date().toISOString(),
            updated_at: reaction.updatedAt?.toISOString() || new Date().toISOString()
        };
    }

    private static initializeReactionStats() {
        return {
            total: 0,
            types: {
                [LawReactionType.APPROVE]: 0,
                [LawReactionType.DISAPPROVE]: 0,
            },
            emojis: {
                [LawReactionEmoji.INSTRUCTIVE]: 0,
                [LawReactionEmoji.SUPPORT]: 0,
                [LawReactionEmoji.LOVE]: 0,
                [LawReactionEmoji.BRAVO]: 0
            }
        };
    }

    public static toResponse(lawPost: any, reactions: any[] = []): LawPostResponse {
        const response: LawPostResponse = {
            id: lawPost._id.toString(),
            legislature: lawPost.legislature,
            title: lawPost.title,
            article_constitutionnel: lawPost.article_constitutionnel,
            vote_type: lawPost.vote_type,
            adopted: lawPost.adopted,
            date_proposition: lawPost.date_proposition?.toISOString() || new Date().toISOString(),
            date_adoption: lawPost.date_adoption?.toISOString() || new Date().toISOString(),
            vote_yes: lawPost.vote_yes,
            vote_no: lawPost.vote_no,
            vote_abstention: lawPost.vote_abstention,
            has_reevaluable: lawPost.has_reevaluable,
            reevaluable_count: lawPost.reevaluable_count,
            user: this.createUserResponse(lawPost.user_id),
            created_at: lawPost.createdAt?.toISOString() || new Date().toISOString(),
            updated_at: lawPost.updatedAt?.toISOString() || new Date().toISOString(),
            reactions_stats: this.initializeReactionStats(),
            reactions: reactions.map(r => this.transformReaction(r))
        };

        if (reactions.length > 0) {
            response.reactions_stats.total = reactions.length;
            reactions.forEach(reaction => {
                if (reaction.reaction_type) {
                    response.reactions_stats.types[reaction.reaction_type as keyof typeof LawReactionType]++;
                }
                if (reaction.reaction_emoji) {
                    response.reactions_stats.emojis[reaction.reaction_emoji as keyof typeof LawReactionEmoji]++;
                }
            });
        }

        return response;
    }
} 