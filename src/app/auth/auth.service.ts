import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { User, LoginRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn$: Observable<boolean>;
  public currentUser$: Observable<User | null>;

  constructor(
    private userService: UserService,

  ) {
    this.isLoggedIn$ = this.userService.isLoggedIn$;
    this.currentUser$ = this.userService.currentUser$;
  }

  login(email: string, password: string): Observable<boolean> {
    const loginData: LoginRequest = { email, password };
    return this.userService.login(loginData);
  }

  signup(userData: any): Observable<boolean> {
    return this.userService.createUser(userData).pipe(
      map(createdUser => !!createdUser)
    );
  }

  logout(): void {
    this.userService.logout();
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  getCurrentUser(): User | null {
    return this.userService.getCurrentUser();
  }


}