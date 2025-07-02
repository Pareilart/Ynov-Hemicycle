import { Types } from 'mongoose';
import { IUserDocument } from './IUserDocument';

export interface ILawPost {
  _id: Types.ObjectId;
  legislature: number;
  title: string;
  articleConstitutionnel: number;
  voteType: string;
  adopted: boolean;
  dateProposition: Date;
  dateAdoption: Date;
  voteYes: number;
  voteNo: number;
  voteAbstention: number;
  hasReevaluable: boolean;
  reevaluableCount: number;
  userId: Types.ObjectId | IUserDocument;
  createdAt: Date;
  updatedAt: Date;
}
