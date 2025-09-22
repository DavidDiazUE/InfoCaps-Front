export interface Lesson {
  id: number;
  lessonTitle: string;
  contentUrl: string;
  orderNumber: number;
  durationMinutes: number;
  contentType: string;
  status: string;
  course: Course;   // 👈 obligatorio
}

export interface Course {
  id: number;
  title: string;
  description: string;
  level: string;
  durationHours: number;
  creationDate: string;
  status: string;
  category: Category;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
  status: string;
}
