import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
export const authGuard: CanActivateFn = (route, state) => {
  const router= inject(Router);
  const authService=inject(AuthenticationService)
  if (authService.isLoggedIn()) {
  return true;} else {
    router.navigate(['/login']); // Redirect to login if not logged in
    return false;
  }
 
};
