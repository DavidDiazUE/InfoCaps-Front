import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.getCurrentUser();
    
    if (currentUser && currentUser.hasSubscription) {
      return true;
    } else {
      // Guardar la ruta a la que quería acceder para redirigir después del pago
      const returnUrl = route.url.map(segment => segment.path).join('/');
      this.router.navigate(['/subscription'], { queryParams: { returnUrl } });
      return false;
    }
  }
}