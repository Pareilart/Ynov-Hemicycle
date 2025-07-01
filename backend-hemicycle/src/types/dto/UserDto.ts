import { IUserDocument } from '../interfaces/IUserDocument';
import { UserResponse } from '../responses/UserResponse';
import { RoleResponse } from '../responses/RoleResponse';
import { AddressesResponse } from '../responses/AddressesResponse';
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
      firstName: userDoc.firstName,
      lastName: userDoc.lastName,
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
    if (userDoc.addresses) {
      response.addresses = {
        line1: userDoc.addresses.line1,
        line2: userDoc.addresses.line2,
        postalCode: userDoc.addresses.postalCode,
        city: userDoc.addresses.city,
        state: userDoc.addresses.state,
        country: userDoc.addresses.country,
      } as AddressesResponse;
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
