import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: number;
  instructor: string;
  price: number;
  imageUrl: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  description: string;
  content: string;
  videoUrl: string;
  duration: number;
  order: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private lessonsSubject = new BehaviorSubject<Lesson[]>([]);
  public lessons$ = this.lessonsSubject.asObservable();

  constructor() {
    // Datos de ejemplo que serán reemplazados por llamadas al backend
    this.initializeMockData();
  }

  private initializeMockData() {
    // Datos de ejemplo - en producción vendrán del backend
    const mockLessons: Lesson[] = [
      {
        id: 1,
        courseId: 1,
        title: '¿Sabías que Tutankamón se convirtió en faraón de Egipto con solo 9 años?',
        description: 'Su tumba fue hallada en 1922 casi intacta, ¡y se volvió uno de los descubrimientos más famosos de la arqueología!',
        content: 'Contenido completo de la lección que vendrá del backend...',
        videoUrl: '',
        duration: 5,
        order: 1
      }
    ];
    
    this.lessonsSubject.next(mockLessons);
  }

  // Métodos que se conectarán al backend
  getLessonsByCategory(category: string): Observable<Lesson[]> {
    // return this.http.get<Lesson[]>(`/api/lessons/category/${category}`);
    return of(this.lessonsSubject.value.filter(lesson => lesson.courseId === 1));
  }

  getLessonById(id: number): Observable<Lesson | undefined> {
    // return this.http.get<Lesson>(`/api/lessons/${id}`);
    return of(this.lessonsSubject.value.find(lesson => lesson.id === id));
  }

  createLesson(lesson: Omit<Lesson, 'id'>): Observable<Lesson> {
    // return this.http.post<Lesson>('/api/lessons', lesson);
    const newLesson = { ...lesson, id: Date.now() };
    const currentLessons = this.lessonsSubject.value;
    this.lessonsSubject.next([...currentLessons, newLesson]);
    return of(newLesson);
  }

  updateLesson(id: number, lesson: Partial<Lesson>): Observable<Lesson> {
    // return this.http.put<Lesson>(`/api/lessons/${id}`, lesson);
    const currentLessons = this.lessonsSubject.value;
    const index = currentLessons.findIndex(l => l.id === id);
    if (index !== -1) {
      currentLessons[index] = { ...currentLessons[index], ...lesson };
      this.lessonsSubject.next([...currentLessons]);
      return of(currentLessons[index]);
    }
    throw new Error('Lesson not found');
  }

  deleteLesson(id: number): Observable<boolean> {
    // return this.http.delete<boolean>(`/api/lessons/${id}`);
    const currentLessons = this.lessonsSubject.value;
    const filteredLessons = currentLessons.filter(l => l.id !== id);
    this.lessonsSubject.next(filteredLessons);
    return of(true);
  }
}