import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { User, LoginRequest } from '../models/user.model';
import { BackendUserResponse, CreateUserRequest } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.checkStoredUser();
  }

  private checkStoredUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  // Crear usuario (registro)
  createUser(userData: CreateUserRequest): Observable<User> {
    const requestData: CreateUserRequest = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password
    };

    return this.apiService.post<BackendUserResponse>('user-sav', requestData).pipe(
      map((response: BackendUserResponse) => ({
        user_id: response.user_id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        password: response.password
      })),
      catchError(error => {
        console.error('❌ Error creating user:', error);
        throw error;
      })
    );
  }

  // Login
  login(loginData: LoginRequest): Observable<boolean> {
    return this.apiService.get<BackendUserResponse>('user-email', { correo: loginData.email }).pipe(
      map((response: BackendUserResponse) => {
        if (response && response.password === loginData.password) {
          const user: User = {
            user_id: response.user_id,
            firstName: response.firstName,
            lastName: response.lastName,
            email: response.email,
            password: response.password
          };

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.isLoggedInSubject.next(true);
          return true;
        }
        return false;
      }),
      catchError(error => {
        console.error('❌ Login error:', error);
        return of(false);
      })
    );
  }

  // Obtener todos los usuarios
  getAllUsers(): Observable<User[]> {
    return this.apiService.get<BackendUserResponse[]>('user-all').pipe(
      map((responses: BackendUserResponse[]) =>
        responses.map(response => ({
          user_id: response.user_id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          password: response.password
        }))
      )
    );
  }

  // Obtener usuario por ID
  getUserById(user_id: number): Observable<User> {
    return this.apiService.get<BackendUserResponse>('user-id', { id: user_id }).pipe(
      map((response: BackendUserResponse) => ({
        user_id: response.user_id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        password: response.password
      }))
    );
  }

  // Actualizar usuario
  updateUser(user: User): Observable<User> {
    return this.apiService.put<BackendUserResponse>('user-up', user).pipe(
      map((response: BackendUserResponse) => {
        const updatedUser: User = {
          user_id: response.user_id,
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          password: response.password
        };

        const currentUser = this.currentUserSubject.value;
        if (currentUser && currentUser.user_id === user.user_id) {
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          this.currentUserSubject.next(updatedUser);
        }
        return updatedUser;
      })
    );
  }

  // Eliminar usuario
  deleteUser(user_id: number): Observable<string> {
    return this.apiService.delete<string>(`user-del/${user_id}`);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}
