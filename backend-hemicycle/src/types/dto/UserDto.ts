import { IUserDocument } from '../interfaces/IUserDocument';
import { UserResponse } from '../responses/UserResponse';
import { RoleResponse } from '../responses/RoleResponse';
import { AddressResponse } from '../responses/AddressResponse';
import { VotingSurveyResponse } from '../responses/VotingSurveyResponse';

interface TokenResponse {
  token: string;
  refreshToken: string;
  expiresIn: number;
  exp: number;
}

export class UserDto {
  public static toResponse(userDoc: IUserDocument): UserResponse {
    const response: UserResponse = {
      id: userDoc._id.toString(),
      firstname: userDoc.firstname,
      lastname: userDoc.lastname,
      birthday: userDoc.birthday,
      sexe: userDoc.sexe as 'Homme' | 'Femme' | 'Autre',
      email: userDoc.email,
      emailVerifiedAt: userDoc.emailVerifiedAt,
      hasOnBoarding: userDoc.hasOnBoarding || false,
      twoFactorEnabled: userDoc.twoFactorEnabled || false,
    };

    // Ajouter le rôle s'il existe
    if (userDoc.role) {
      response.role = {
        id: userDoc.role._id.toString(),
        name: userDoc.role.name,
        description: userDoc.role.description,
      } as RoleResponse;
    }

    // Ajouter l'adresse si elle existe
    if (userDoc.address) {
      response.address = {
        line1: userDoc.address.line1,
        line2: userDoc.address.line2,
        postalCode: userDoc.address.postalCode,
        city: userDoc.address.city,
        state: userDoc.address.state,
        country: userDoc.address.country,
      } as AddressResponse;
    }

    // Ajouter le sondage de vote s'il existe
    if (userDoc.votingSurvey) {
      response.votingSurvey = {
        id: userDoc.votingSurvey._id.toString(),
        votingFrequency: userDoc.votingSurvey.votingFrequency,
        electoralRegistration: userDoc.votingSurvey.electoralRegistration,
        positioning: userDoc.votingSurvey.positioning,
        proximity: userDoc.votingSurvey.proximity,
      } as VotingSurveyResponse;
    }

    return response;
  }
}
