export interface User {
  user_id?: number;
  id?: number; // Para compatibilidad
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
  business_type?: string;
  location?: string;
  registration_date?: string;
  status?: string;
  hasSubscription?: boolean; // Para el guard
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token?: string;
}