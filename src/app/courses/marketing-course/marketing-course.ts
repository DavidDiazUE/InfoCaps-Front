import { Component } from '@angular/core';
import { CourseListComponent } from '../course-list/course-list';

@Component({
  selector: 'app-marketing-course',
  standalone: true,
  imports: [CourseListComponent],
  template: '<app-course-list category="marketing" categoryIcon="📈" categoryColor="#3498db"></app-course-list>'
})
export class MarketingCourseComponent {}