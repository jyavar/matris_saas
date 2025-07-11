import { SetMetadata } from '@nestjs/common';

export const ML_PERMISSIONS_KEY = 'mlPermissions';

export enum MLPermission {
  READ = 'ml:read',
  WRITE = 'ml:write',
  TRAIN = 'ml:train',
  DEPLOY = 'ml:deploy',
  ADMIN = 'ml:admin',
}

export const RequireMLPermission = (permission: MLPermission) =>
  SetMetadata(ML_PERMISSIONS_KEY, permission);

// Decoradores específicos para operaciones ML
export const RequireMLRead = () => RequireMLPermission(MLPermission.READ);
export const RequireMLWrite = () => RequireMLPermission(MLPermission.WRITE);
export const RequireMLTrain = () => RequireMLPermission(MLPermission.TRAIN);
export const RequireMLDeploy = () => RequireMLPermission(MLPermission.DEPLOY);
export const RequireMLAdmin = () => RequireMLPermission(MLPermission.ADMIN); 