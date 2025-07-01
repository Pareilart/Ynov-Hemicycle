import { LawPostResponse } from '../responses/LawPostResponse';
import { UserResponse } from '../responses/UserResponse';
import { LawReactionEmoji, LawReactionType } from '../../enum/LawReactionTypeEnum';
import { ILawPost } from '../interfaces/ILawPost';
import { ILawReaction } from '../interfaces/ILawReaction';
import { IUserDocument } from '../interfaces/IUserDocument';
import User from '../../models/User';
import { LawReactionResponse } from '../responses/LawReactionResponse';

export class LawPostDto {
  private static createUserResponse(user: IUserDocument): UserResponse {
    return {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      hasOnBoarding: user.hasOnBoarding || false,
    };
  }

  private static async transformReaction(reaction: ILawReaction): Promise<LawReactionResponse> {
    const user = await User.findById(reaction.user_id);
    if (!user) throw new Error('User not found');

    return {
      id: reaction._id.toString(),
      user: this.createUserResponse(user as IUserDocument),
      reaction_type: reaction.reaction_type,
      reaction_emoji: reaction.reaction_emoji,
      created_at: reaction.createdAt?.toISOString() || new Date().toISOString(),
      updated_at: reaction.updatedAt?.toISOString() || new Date().toISOString(),
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
        [LawReactionEmoji.BRAVO]: 0,
      },
    };
  }

  public static async toResponse(lawPost: ILawPost, reactions: ILawReaction[] = []): Promise<LawPostResponse> {
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
      user: this.createUserResponse(lawPost.user_id as IUserDocument),
      createdAt: lawPost.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: lawPost.updatedAt?.toISOString() || new Date().toISOString(),
      reactions_stats: this.initializeReactionStats(),
    };

    if (reactions.length > 0) {
      response.reactions_stats.total = reactions.length;
      reactions.forEach((reaction) => {
        if (reaction.reaction_type) {
          response.reactions_stats.types[reaction.reaction_type as keyof typeof LawReactionType]++;
        }
        if (reaction.reaction_emoji) {
          response.reactions_stats.emojis[reaction.reaction_emoji as keyof typeof LawReactionEmoji]++;
        }
      });

      if (reactions.length === 1) {
        response.reactions = await Promise.all(reactions.map((r) => this.transformReaction(r)));
      }
    }

    return response;
  }
}
