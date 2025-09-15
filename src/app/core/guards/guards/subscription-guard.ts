import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.getCurrentUser();
    
    if (this.authService.isAuthenticated() && currentUser?.hasSubscription) {
      return true;
    } else if (this.authService.isAuthenticated()) {
      this.router.navigate(['/subscription']);
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}