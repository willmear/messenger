import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getToken() !== null) {
    const role = route.data["roles"] as String;

    if (role) {
      const match = authService.roleMatch(role);

      if(match) {
        return true;
      } else {
        router.navigate(['/forbidden']);
        return false;
      }
    }
  }

  router.navigate(['/login']);
  return false;


};
