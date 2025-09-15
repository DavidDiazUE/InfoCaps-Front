import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  
  price: string;
  image: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses: Course[] = [
    {
      id: 1,
      title: 'Contabilidad Básica',
      description: 'Aprende los fundamentos de la contabilidad desde cero',
      category: 'accounting',
      duration: '8 horas',
      
      price: "20.000",
      image: '',
      lessons: [
        { id: 1, title: 'Introducción a la Contabilidad', duration: '45 min', videoUrl: '', description: 'Conceptos básicos' },
        { id: 2, title: 'Balance General', duration: '60 min', videoUrl: '', description: 'Estructura del balance' },
        { id: 3, title: 'Estado de Resultados', duration: '55 min', videoUrl: '', description: 'Análisis de resultados' }
      ]
    },
    {
      id: 2,
      title: 'Finanzas Personales',
      description: 'Gestiona tus finanzas personales de manera efectiva',
      category: 'finance',
      duration: '6 horas',
     
      price: "20.000",
      image: '',
      lessons: [
        { id: 4, title: 'Presupuesto Personal', duration: '40 min', videoUrl: '', description: 'Cómo crear un presupuesto' },
        { id: 5, title: 'Inversiones Básicas', duration: '50 min', videoUrl: '', description: 'Primeros pasos en inversión' },
        { id: 6, title: 'Ahorro e Interés Compuesto', duration: '45 min', videoUrl: '', description: 'Estrategias de ahorro' }
      ]
    },
    {
      id: 3,
      title: 'Marketing Digital',
      description: 'Domina las estrategias de marketing en el mundo digital',
      category: 'marketing',
      duration: '10 horas',
    
      price: "20.000",
      image: '',
      lessons: [
        { id: 7, title: 'SEO y SEM', duration: '70 min', videoUrl: '', description: 'Optimización para motores de búsqueda' },
        { id: 8, title: 'Redes Sociales', duration: '65 min', videoUrl: '', description: 'Estrategias en redes sociales' },
        { id: 9, title: 'Email Marketing', duration: '50 min', videoUrl: '', description: 'Campañas efectivas por email' }
      ]
    },
    {
      id: 4,
      title: 'Emprendimiento',
      description: 'Convierte tu idea en un negocio exitoso',
      category: 'entrepreneurship',
      duration: '12 horas',
     
      price: "20.000",
      image: '',
      lessons: [
        { id: 10, title: 'Validación de Ideas', duration: '60 min', videoUrl: '', description: 'Cómo validar tu idea de negocio' },
        { id: 11, title: 'Plan de Negocios', duration: '80 min', videoUrl: '', description: 'Estructura de un plan de negocios' },
        { id: 12, title: 'Financiamiento', duration: '70 min', videoUrl: '', description: 'Opciones de financiamiento' }
      ]
    }
  ];

  getCourses(): Observable<Course[]> {
    return of(this.courses);
  }

  getCourseById(id: number): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === id);
    return of(course);
  }

  getCourseByCategory(category: string): Observable<Course | undefined> {
    const course = this.courses.find(c => c.category === category);
    return of(course);
  }
}