// user.model.ts
export interface User {
  user_id?: number;  // ✅ único identificador
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  hasSubscription?: boolean; // opcional si lo usas para el guard
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token?: string;
}
