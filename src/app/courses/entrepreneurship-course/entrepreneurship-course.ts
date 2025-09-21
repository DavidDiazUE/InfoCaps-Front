import { Component } from '@angular/core';
import { CourseListComponent } from '../course-list/course-list';

@Component({
  selector: 'app-entrepreneurship-course',
  standalone: true,
  imports: [CourseListComponent],
  template: '<app-course-list category="emprendimiento" categoryIcon="🚀" categoryColor="#f39c12"></app-course-list>'
})
export class EntrepreneurshipCourseComponent {}