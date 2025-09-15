import { Component } from '@angular/core';
import { CourseDetailComponent } from '../course-detail/course-detail';

@Component({
  selector: 'app-accounting-course',
  standalone: true,
  imports: [CourseDetailComponent],
  template: '<app-course-detail></app-course-detail>'
})
export class AccountingCourseComponent {}