export interface Lesson {
  lesson_id?: number;
  course_id: number;
  lesson_title: string;
  content_url?: string;
  order_number: number;
  duration_minutes?: number;
  content_type?: string;
  status: string;
}

export interface Course {
  course_id?: number;
  title: string;
  description: string;
  category_id: number;
  level: string;
  duration_hours?: number;
  creation_date?: string;
  status: string;
}

export interface Category {
  category_id?: number;
  name: string;
  description: string;
  icon_url: string;
  status: string;
}