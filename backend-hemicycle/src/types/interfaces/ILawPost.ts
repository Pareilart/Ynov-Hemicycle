import { Types } from 'mongoose';
import { IUserDocument } from './IUserDocument';

export interface ILawPost {
    legislature: number;
    title: string;
    article_constitutionnel: number;
    vote_type: string;
    adopted: boolean;
    date_proposition: Date;
    date_adoption: Date;
    vote_yes: number;
    vote_no: number;
    vote_abstention: number;
    has_reevaluable: boolean;
    reevaluable_count: number;
    user_id: Types.ObjectId | IUserDocument;
}

