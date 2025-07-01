import { PermissionResponse } from './PermissionResponse';

export type RoleResponse = {
  id: string;
  name: string;
  description: string;
  permissions?: PermissionResponse[];
};
