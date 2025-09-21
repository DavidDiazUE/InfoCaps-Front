import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { LessonService } from '../../services/lesson.service';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css'
})
export class CourseDetailComponent implements OnInit {
  lesson: Lesson | null = null;
  category: string = '';
  lessonId: string = '';
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private lessonService: LessonService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.lessonId = params['id'];
      this.loadLesson();
    });
  }

  loadLesson() {
    this.loading = true;
    const lessonIdNumber = parseInt(this.lessonId, 10);
    
    this.lessonService.getLessonById(lessonIdNumber).subscribe({
      next: (lesson) => {
        this.lesson = lesson;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading lesson:', error);
        this.lesson = null;
        this.loading = false;
      }
    });
  }

  getCategoryIcon(): string {
    switch(this.category) {
      case 'contabilidad': return '📊';
      case 'finanzas': return '💰';
      case 'marketing': return '📈';
      case 'emprendimiento': return '🚀';
      default: return '📚';
    }
  }
  
  goBack() {
    this.router.navigate([`/${this.category}/lessons`]);
  }

  markAsCompleted() {
    // Aquí puedes implementar la lógica para marcar la lección como completada
    console.log('Lesson marked as completed:', this.lesson?.lesson_id);
  }

  goToNextLesson() {
    // Aquí puedes implementar la lógica para ir a la siguiente lección
    console.log('Going to next lesson');
  }
}