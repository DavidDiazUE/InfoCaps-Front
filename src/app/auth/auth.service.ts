import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  hasSubscription: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  public isLoggedIn$ = this.isLoggedInSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    // Check if user is logged in from localStorage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.currentUserSubject.next(user);
      this.isLoggedInSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<boolean> {
    return new Observable(observer => {
      // Simulate API call
      setTimeout(() => {
        if (email && password) {
          const user: User = {
            id: 1,
            email: email,
            firstName: 'Usuario',
            lastName: 'Demo',
            hasSubscription: false
          };
          
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.isLoggedInSubject.next(true);
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 1000);
    });
  }

  signup(userData: any): Observable<boolean> {
    return new Observable(observer => {
      // Simulate API call
      setTimeout(() => {
        const user: User = {
          id: Date.now(),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          hasSubscription: false
        };
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  updateSubscriptionStatus(hasSubscription: boolean): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      currentUser.hasSubscription = hasSubscription;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.currentUserSubject.next(currentUser);
    }
  }
}