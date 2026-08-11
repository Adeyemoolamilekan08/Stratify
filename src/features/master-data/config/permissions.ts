// src/features/master-data/config/permissions.ts

import { MasterEntity } from './entities';

export interface MasterPermissions {
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canExport: boolean;
  canImport: boolean;
}

export const getMasterPermissions = (
  entity: MasterEntity,
  userPermissions: string[]
): MasterPermissions => {
  const prefix = `MASTER_${entity.toUpperCase()}`;
  
  return {
    canView: userPermissions.includes(`${prefix}_READ`),
    canCreate: userPermissions.includes(`${prefix}_CREATE`),
    canEdit: userPermissions.includes(`${prefix}_UPDATE`),
    canDelete: userPermissions.includes(`${prefix}_DELETE`),
    canExport: userPermissions.includes(`${prefix}_EXPORT`),
    canImport: userPermissions.includes(`${prefix}_IMPORT`),
  };
};