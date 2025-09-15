import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseService, Course } from '../course.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
  providers: [CourseService]
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  isLoggedIn = false;
  hasSubscription = false;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const category = params['category'];
      this.loadCourse(category);
    });

    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });

    this.authService.currentUser$.subscribe(user => {
      this.hasSubscription = user?.hasSubscription || false;
    });
  }

  loadCourse(category: string) {
    this.courseService.getCourseByCategory(category).subscribe(course => {
      this.course = course || null;
    });
  }

  enrollCourse() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.hasSubscription) {
      this.router.navigate(['/subscription']);
      return;
    }

    // User is logged in and has subscription - can access course
    alert('¡Felicitaciones! Ya puedes acceder a todas las lecciones del curso.');
  }
}