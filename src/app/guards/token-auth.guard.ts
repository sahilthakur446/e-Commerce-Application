import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service/auth.service';
import { StorageService } from '../services/storage-service/storage.service';

export const tokenAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const authService = inject(AuthService)

  if (!authService.isTokenExpired()) {
    return true;
  } else {
    const storageService = inject(StorageService)
    storageService.clear()
    router.navigate(['login'])
    return false;
  }
};
