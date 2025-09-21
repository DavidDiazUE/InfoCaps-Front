import { Component } from '@angular/core';
import { CourseListComponent } from '../course-list/course-list';

@Component({
  selector: 'app-accounting-course',
  standalone: true,
  imports: [CourseListComponent],
  template: '<app-course-list category="contabilidad" categoryIcon="📊" categoryColor="#e74c3c"></app-course-list>'
})
export class AccountingCourseComponent {}