import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseListComponent implements OnInit {
  @Input() category: string = '';
  @Input() categoryIcon: string = '';
  @Input() categoryColor: string = '';
  
  lessons: Lesson[] = [];
  loading = false;
  isLoggedIn = false;
  
  courseInfo = {
    title: '',
    description: '',
    totalLessons: 0,
    estimatedDuration: 0,
    level: 'Principiante',
    topics: [] as string[]
  };

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private authService: AuthService,
    private lessonService: LessonService
  ) {}

  ngOnInit() {
    console.log('🎯 CourseListComponent initialized');
    
    // Obtener categoría de la URL si no se pasó como Input
    if (!this.category) {
      this.category = this.route.snapshot.url[0]?.path || '';
    }
    
    console.log('📚 Category:', this.category);
    
    // Configurar información del curso
    this.setCategoryData();
    
    // Verificar estado de autenticación
    this.checkAuthStatus();
  }

  setCategoryData() {
    console.log('⚙️ Setting category data for:', this.category);
    
    switch(this.category) {
      case 'contabilidad':
        this.categoryIcon = this.categoryIcon || '📊';
        this.categoryColor = this.categoryColor || '#e74c3c';
        this.courseInfo = {
          title: 'Curso de Contabilidad',
          description: 'Aprende los fundamentos de la contabilidad empresarial, desde conceptos básicos hasta estados financieros avanzados.',
          totalLessons: 0,
          estimatedDuration: 0,
          level: 'Principiante a Intermedio',
          topics: [
            'Principios básicos de contabilidad',
            'Estados financieros',
            'Balance general y estado de resultados',
            'Análisis de costos',
            'Presupuestos empresariales',
            'Normativas contables'
          ]
        };
        break;
      case 'finanzas':
        this.categoryIcon = this.categoryIcon || '💰';
        this.categoryColor = this.categoryColor || '#27ae60';
        this.courseInfo = {
          title: 'Curso de Finanzas',
          description: 'Domina las finanzas personales y empresariales, inversiones, y gestión del riesgo financiero.',
          totalLessons: 0,
          estimatedDuration: 0,
          level: 'Principiante a Avanzado',
          topics: [
            'Finanzas personales',
            'Inversiones y portafolios',
            'Análisis financiero',
            'Gestión de riesgos',
            'Mercados financieros',
            'Planificación financiera'
          ]
        };
        break;
      case 'marketing':
        this.categoryIcon = this.categoryIcon || '📈';
        this.categoryColor = this.categoryColor || '#3498db';
        this.courseInfo = {
          title: 'Curso de Marketing',
          description: 'Estrategias de marketing digital y tradicional para hacer crecer tu negocio y llegar a más clientes.',
          totalLessons: 0,
          estimatedDuration: 0,
          level: 'Principiante a Intermedio',
          topics: [
            'Marketing digital',
            'Redes sociales',
            'SEO y SEM',
            'Email marketing',
            'Análisis de mercado',
            'Branding y posicionamiento'
          ]
        };
        break;
      case 'emprendimiento':
        this.categoryIcon = this.categoryIcon || '🚀';
        this.categoryColor = this.categoryColor || '#f39c12';
        this.courseInfo = {
          title: 'Curso de Emprendimiento',
          description: 'Convierte tu idea en un negocio exitoso. Aprende sobre modelos de negocio, financiamiento y crecimiento.',
          totalLessons: 0,
          estimatedDuration: 0,
          level: 'Principiante a Avanzado',
          topics: [
            'Desarrollo de ideas de negocio',
            'Modelos de negocio',
            'Plan de negocios',
            'Financiamiento y capital',
            'Estrategias de crecimiento',
            'Liderazgo empresarial'
          ]
        };
        break;
    }
    
    console.log('✅ Category data set:', this.courseInfo);
  }

  checkAuthStatus() {
    console.log('🔐 Checking auth status');
    
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      console.log('🔐 Auth status changed:', loggedIn);
      this.isLoggedIn = loggedIn;
      
      if (loggedIn) {
        console.log('✅ User is logged in, loading lessons');
        this.loadLessonsFromBackend();
      } else {
        console.log('❌ User not logged in, clearing lessons');
        this.lessons = [];
        this.loading = false;
      }
    });
  }

  viewLesson(lesson: Lesson) {
    console.log('👁️ Viewing lesson:', lesson);
    
    if (!this.isLoggedIn) {
      console.log('❌ User not logged in, redirecting to login');
      this.router.navigate(['/login']);
      return;
    }
    
    console.log('✅ Navigating to lesson:', lesson.lesson_id);
    this.router.navigate(['/lesson', this.category, lesson.lesson_id]);
  }

  private loadLessonsFromBackend() {
    if (!this.isLoggedIn) {
      console.log('❌ Cannot load lessons - user not logged in');
      this.loading = false;
      return;
    }
    
    console.log('📚 Loading lessons from backend for category:', this.category);
    this.loading = true;
    
    this.lessonService.getLessonsByCategory(this.category).subscribe({
      next: (lessons) => {
        console.log('✅ Lessons loaded successfully:', lessons);
        this.lessons = lessons;
        this.courseInfo.totalLessons = lessons.length;
        this.courseInfo.estimatedDuration = lessons.reduce((total, lesson) => 
          total + (lesson.duration_minutes || 5), 0
        );
        this.loading = false;
        
        console.log('📊 Course stats updated:', {
          totalLessons: this.courseInfo.totalLessons,
          estimatedDuration: this.courseInfo.estimatedDuration
        });
      },
      error: (error) => {
        console.error('❌ Error loading lessons:', error);
        this.lessons = [];
        this.courseInfo.totalLessons = 0;
        this.courseInfo.estimatedDuration = 0;
        this.loading = false;
      }
    });
  }
}