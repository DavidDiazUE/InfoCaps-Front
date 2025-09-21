
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
  message?: string;
}


export interface UserResponse {
  user_id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LessonResponse {
  lesson_id: number;
  course_id: number;
  lesson_title: string;
  content_url?: string;
  order_number: number;
  duration_minutes: number;
  content_type: string;
  status: string;
  created_date?: string;
}

export interface CourseResponse {
  course_id: number;
  title: string;
  description: string;
  category_id: number;
  level: string;
  duration_hours: number;
  creation_date: string;
  status: string;
}


export interface BackendUserResponse {
  user_id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  status: string;
}


export interface BackendLessonResponse {
  id: number;
  course: {
    id: number;
    title: string;
    description: string;
    category: {
      id: number;
      name: string;
      description: string;
      iconUrl: string;
      status: string;
    };
    level: string;
    durationHours: number;
    creationDate: string;
    status: string;
  };
  lessonTitle: string;
  contentUrl?: string;
  orderNumber: number;
  durationMinutes?: number;
  contentType?: string;
  status: string;
}


export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}