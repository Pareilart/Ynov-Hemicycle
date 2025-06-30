import { RoleResponse } from './RoleResponse';
import { AddressesResponse } from './AddressesResponse';

export type UserResponse = {
    id: string;
    firstName: string;
    lastName: string;
    birthday?: Date;
    sexe?: 'Homme' | 'Femme' | 'Autre';
    email: string;
    emailVerifiedAt?: Date;
    role?: RoleResponse;
    addresses?: AddressesResponse;
    token? : {
        token : string;
        expiresIn : number;
        exp : number;
    }
}; 