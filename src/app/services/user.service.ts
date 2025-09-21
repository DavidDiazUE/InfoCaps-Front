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
    // Verificar si hay usuario en localStorage al inicializar
    this.checkStoredUser();
  }

  private checkStoredUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
        console.log('👤 Usuario cargado desde localStorage:', user);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  // Crear usuario (registro) - simplificado sin teléfono ni tipo de negocio
  createUser(userData: CreateUserRequest): Observable<User> {
    const requestData: CreateUserRequest = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      password: userData.password
    };

    console.log('📝 Creating user with data:', requestData);

    return this.apiService.post<BackendUserResponse>('user-sav', requestData).pipe(
      map((response: BackendUserResponse) => {
        console.log('✅ User created successfully:', response);
        
        // Convertir respuesta del backend al modelo User
        const user: User = {
          user_id: response.user_id,
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          password: response.password,
          phone: response.phone || '',
          business_type: response.business_type || '',
          location: response.location || '',
          registration_date: response.registration_date,
          status: response.status
        };

        return user;
      }),
      catchError(error => {
        console.error('❌ Error creating user:', error);
        throw error;
      })
    );
  }

  // Login (buscar usuario por email)
  login(loginData: LoginRequest): Observable<boolean> {
    console.log('🔐 Attempting login for:', loginData.email);
    
    return this.apiService.get<BackendUserResponse>('user-email', { correo: loginData.email }).pipe(
      map((response: BackendUserResponse) => {
        console.log('👤 User found:', response);
        
        if (response && response.password === loginData.password && response.status === 'active') {
          // Convertir respuesta del backend al modelo User
          const user: User = {
            user_id: response.user_id,
            first_name: response.first_name,
            last_name: response.last_name,
            email: response.email,
            password: response.password,
            phone: response.phone || '',
            business_type: response.business_type || '',
            location: response.location || '',
            registration_date: response.registration_date,
            status: response.status
          };

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.isLoggedInSubject.next(true);
          console.log('✅ Login successful');
          return true;
        }
        
        console.log('❌ Invalid credentials or inactive user');
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
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          password: response.password,
          phone: response.phone || '',
          business_type: response.business_type || '',
          location: response.location || '',
          registration_date: response.registration_date,
          status: response.status
        }))
      )
    );
  }

  // Obtener usuario por ID
  getUserById(id: number): Observable<User> {
    return this.apiService.get<BackendUserResponse>('user-id', { id }).pipe(
      map((response: BackendUserResponse) => ({
        user_id: response.user_id,
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        password: response.password,
        phone: response.phone || '',
        business_type: response.business_type || '',
        location: response.location || '',
        registration_date: response.registration_date,
        status: response.status
      }))
    );
  }

  // Actualizar usuario
  updateUser(user: User): Observable<User> {
    return this.apiService.put<BackendUserResponse>('user-up', user).pipe(
      map((response: BackendUserResponse) => {
        const updatedUser: User = {
          user_id: response.user_id,
          first_name: response.first_name,
          last_name: response.last_name,
          email: response.email,
          password: response.password,
          phone: response.phone || '',
          business_type: response.business_type || '',
          location: response.location || '',
          registration_date: response.registration_date,
          status: response.status
        };

        // Actualizar usuario en localStorage si es el usuario actual
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
  deleteUser(id: number): Observable<string> {
    return this.apiService.delete<string>(`user-del/${id}`);
  }

  // Logout
  logout(): void {
    console.log('👋 Logging out user');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  // Obtener usuario actual
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Verificar si está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
}