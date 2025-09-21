import { Component } from '@angular/core';
import { CourseListComponent } from '../course-list/course-list';

@Component({
  selector: 'app-finance-course',
  standalone: true,
  imports: [CourseListComponent],
  template: '<app-course-list category="finanzas" categoryIcon="💰" categoryColor="#27ae60"></app-course-list>'
})
export class FinanceCourseComponent {}