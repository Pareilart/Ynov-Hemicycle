import { UserResponse } from './UserResponse';
import { LawPostResponse } from './LawPostResponse';

export interface LawPostReportingResponse {
  id: string;
  user?: UserResponse;
  lawPost: LawPostResponse;
  reason: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
