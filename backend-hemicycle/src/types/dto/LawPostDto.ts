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
    const user = await User.findById(reaction.userId);
    if (!user) throw new Error('User not found');

    return {
      id: reaction._id.toString(),
      user: this.createUserResponse(user as IUserDocument),
      reactionType: reaction.reactionType,
      reactionEmoji: reaction.reactionEmoji,
      createdAt: reaction.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: reaction.updatedAt?.toISOString() || new Date().toISOString(),
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
      articleConstitutionnel: lawPost.articleConstitutionnel,
      voteType: lawPost.voteType,
      adopted: lawPost.adopted,
      dateProposition: lawPost.dateProposition?.toISOString() || new Date().toISOString(),
      dateAdoption: lawPost.dateAdoption?.toISOString() || new Date().toISOString(),
      voteYes: lawPost.voteYes,
      voteNo: lawPost.voteNo,
      voteAbstention: lawPost.voteAbstention,
      hasReevaluable: lawPost.hasReevaluable,
      reevaluableCount: lawPost.reevaluableCount,
      user: this.createUserResponse(lawPost.userId as IUserDocument),
      createdAt: lawPost.createdAt?.toISOString() || new Date().toISOString(),
      updatedAt: lawPost.updatedAt?.toISOString() || new Date().toISOString(),
      reactionsStats: this.initializeReactionStats(),
    };

    if (reactions.length > 0) {
      response.reactionsStats.total = reactions.length;
      reactions.forEach((reaction) => {
        if (reaction.reactionType) {
          response.reactionsStats.types[reaction.reactionType as keyof typeof LawReactionType]++;
        }
        if (reaction.reactionEmoji) {
          response.reactionsStats.emojis[reaction.reactionEmoji as keyof typeof LawReactionEmoji]++;
        }
      });

      if (reactions.length === 1) {
        response.reactions = await Promise.all(reactions.map((r) => this.transformReaction(r)));
      }
    }

    return response;
  }
}
