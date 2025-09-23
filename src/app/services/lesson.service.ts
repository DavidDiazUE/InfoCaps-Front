import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Lesson } from '../models/lesson.model';
import { BackendLessonResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class LessonService {
  constructor(private apiService: ApiService) {}

  // Crear lección
  createLesson(lesson: Lesson): Observable<Lesson> {
    const lessonData = {
      ...lesson,
      status: 'active',
    };
    return this.apiService
      .post<BackendLessonResponse>('leccion-sav', lessonData)
      .pipe(map(this.mapBackendLessonToLesson));
  }

  // Obtener todas las lecciones
  getAllLessons(): Observable<Lesson[]> {
    console.log(' Getting all lessons from backend');
    return this.apiService.get<BackendLessonResponse[]>('leccion-all').pipe(
      map((responses: BackendLessonResponse[]) => {
        console.log(' Raw lessons from backend:', responses);
        const lessons = responses.map(this.mapBackendLessonToLesson);
        console.log(
          '🔎 Lessons after mapping:',
          lessons.map((l) => ({ id: l.id, status: l.status }))
        );
        return lessons;
      }),
      catchError((error) => {
        console.error(' Error getting all lessons:', error);
        return of([]);
      })
    );
  }

  // Obtener lección por ID
  getLessonById(id: number): Observable<Lesson> {
    console.log('📖 Getting lesson by ID:', id);
    return this.apiService.get<BackendLessonResponse>('leccion', { id }).pipe(
      map(this.mapBackendLessonToLesson),
      catchError((error) => {
        console.error(' Error getting lesson by ID:', error);
        throw error;
      })
    );
  }

getLessonsByCourse(courseId: number): Observable<Lesson[]> {
  return this.getAllLessons().pipe(
    map((lessons) => {
      console.log('✅ Lessons before filter:', lessons);

      //  Primero probamos sin filtro para confirmar que se muestran
      return lessons;

      //  Luego, si quieres aplicar filtro correcto:
      /*
      return lessons
        .filter(
          (lesson) =>
            lesson.course?.id === courseId &&
            lesson.status?.toLowerCase() === 'active'
        )
        .sort((a, b) => a.orderNumber - b.orderNumber);
      */
    })
  );
}

  // Obtener lecciones por categoría (filtra en frontend)
  getLessonsByCategory(category: string): Observable<Lesson[]> {
    console.log(' Getting lessons for category:', category);
    return this.getAllLessons().pipe(
      map((lessons) => {
        const filteredLessons = lessons.filter(
          (lesson) => lesson.status === 'published'
        );
        return filteredLessons.sort((a, b) => a.orderNumber - b.orderNumber);
      })
    );
  }

  // Obtener lecciones por status (filtra en frontend)
  getLessonsByStatus(status: string): Observable<Lesson[]> {
    return this.getAllLessons().pipe(
      map((lessons) =>
        lessons.filter((lesson) => lesson.status === status.toLowerCase())
      )
    );
  }

  // Actualizar lección
  updateLesson(lesson: Lesson): Observable<Lesson> {
    return this.apiService
      .put<BackendLessonResponse>('leccion-act', lesson)
      .pipe(map(this.mapBackendLessonToLesson));
  }

  //  Eliminar lección
  deleteLesson(id: number): Observable<string> {
    console.warn('⚠️ deleteLesson no tiene endpoint en el backend');
    return of('No implementado en backend');
  }

  // Obtener solo lecciones activas
  getActiveLessons(): Observable<Lesson[]> {
    return this.getAllLessons().pipe(
      map((lessons) => lessons.filter((lesson) => lesson.status === 'published'))
    );
  }

  // Helper para mapear respuesta del backend
  private mapBackendLessonToLesson(response: BackendLessonResponse): Lesson {
    return {
      id: response.id ?? 0,
      lessonTitle: response.lessonTitle,
      contentUrl: response.contentUrl ?? '',
      orderNumber: response.orderNumber,
      durationMinutes: response.durationMinutes ?? 5,
      contentType: response.contentType ?? 'video',
      status: response.status?.toLowerCase() ?? 'inactive', // 👈 normalizado
      course: response.course
        ? {
            id: response.course.id,
            title: response.course.title,
            description: response.course.description,
            level: response.course.level,
            durationHours: response.course.durationHours,
            creationDate: response.course.creationDate ?? '',
            status: response.course.status?.toLowerCase() ?? 'inactive',
            category: response.course.category ?? {
              id: 0,
              name: '',
              description: '',
              iconUrl: '',
              status: '',
            },
          }
        : {
            id: 0,
            title: '',
            description: '',
            level: '',
            durationHours: 0,
            creationDate: '',
            status: '',
            category: {
              id: 0,
              name: '',
              description: '',
              iconUrl: '',
              status: '',
            },
          },
    };
  }
}
