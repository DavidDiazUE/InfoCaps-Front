import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Lesson } from '../models/lesson.model';
import { BackendLessonResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private apiService: ApiService) {}

  // Crear lección
  createLesson(lesson: Lesson): Observable<Lesson> {
    const lessonData = {
      ...lesson,
      status: 'active'
    };
    return this.apiService.post<BackendLessonResponse>('lessons', lessonData).pipe(
      map(this.mapBackendLessonToLesson)
    );
  }

  // Obtener todas las lecciones
  getAllLessons(): Observable<Lesson[]> {
    console.log('📚 Getting all lessons from backend');
    return this.apiService.get<BackendLessonResponse[]>('leccion-all').pipe(
      map((responses: BackendLessonResponse[]) => {
        console.log('📚 Raw lessons from backend:', responses);
        return responses.map(this.mapBackendLessonToLesson);
      }),
      catchError(error => {
        console.error('❌ Error getting all lessons:', error);
        return of([]);
      })
    );
  }

  // Obtener lección por ID
getLessonById(id: number): Observable<Lesson> {
  console.log('📖 Getting lesson by ID:', id);
  return this.apiService.get<BackendLessonResponse>('leccion/id', { id }).pipe(
    map(this.mapBackendLessonToLesson),
    catchError(error => {
      console.error('❌ Error getting lesson by ID:', error);
      throw error;
    })
  );
}


  // Obtener lecciones por curso (filtrar por course_id)
  getLessonsByCourse(courseId: number): Observable<Lesson[]> {
    console.log('📚 Getting lessons for course ID:', courseId);
    return this.getAllLessons().pipe(
      map(lessons => {
        const filteredLessons = lessons.filter(lesson =>
          lesson.course_id === courseId && lesson.status === 'published'
        );
        const sortedLessons = filteredLessons.sort((a, b) => a.order_number - b.order_number);
        console.log('📚 Filtered and sorted lessons:', sortedLessons);
        return sortedLessons;
      })
    );
  }

  // Obtener lecciones por categoría (necesitarás mapear categorías a course_ids)
  getLessonsByCategory(category: string): Observable<Lesson[]> {
    console.log('📚 Getting lessons for category:', category);
    
    // Mapeo de categorías a nombres de categorías del backend
    const categoryToBackendName: { [key: string]: string } = {
      'contabilidad': 'Negocios',
      'finanzas': 'Negocios', 
      'marketing': 'Negocios',
      'emprendimiento': 'Negocios'
    };

    const backendCategoryName = categoryToBackendName[category];
    if (!backendCategoryName) {
      console.log('❌ No backend category name found for category:', category);
      return of([]);
    }

    console.log('📚 Getting lessons for backend category:', backendCategoryName);
    return this.getAllLessons().pipe(
      map(lessons => {
        const filteredLessons = lessons.filter(lesson => 
          lesson.status === 'published'
        );
        const sortedLessons = filteredLessons.sort((a, b) => a.order_number - b.order_number);
        console.log('📚 Filtered lessons for category:', category, sortedLessons);
        return sortedLessons;
      })
    );
  }

  // Obtener lecciones por status
  getLessonsByStatus(status: string): Observable<Lesson[]> {
    return this.getAllLessons().pipe(
      map(lessons => lessons.filter(lesson => lesson.status === status))
    );
  }

  // Actualizar lección
  updateLesson(lesson: Lesson): Observable<Lesson> {
    return this.apiService.put<BackendLessonResponse>(`lessons/${lesson.lesson_id}`, lesson).pipe(
      map(this.mapBackendLessonToLesson)
    );
  }

  // Eliminar lección (cambiar status a inactive)
  deleteLesson(id: number): Observable<string> {
    return this.apiService.delete<string>(`lessons/${id}`);
  }

  // Obtener lecciones activas
  getActiveLessons(): Observable<Lesson[]> {
    return this.getAllLessons().pipe(
      map(lessons => lessons.filter(lesson => lesson.status === 'published'))
    );
  }

  // Función helper para mapear respuesta del backend al modelo Lesson
  private mapBackendLessonToLesson(response: BackendLessonResponse): Lesson {
    console.log('🔄 Mapping backend lesson:', response);
    return {
      lesson_id: response.id,
      course_id: response.course.id,
      lesson_title: response.lessonTitle,
      content_url: response.contentUrl,
      order_number: response.orderNumber,
      duration_minutes: response.durationMinutes || 5,
      content_type: response.contentType || 'video',
      status: response.status
    };
  }
}