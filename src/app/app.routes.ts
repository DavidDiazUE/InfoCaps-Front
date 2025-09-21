import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { AccountingCourseComponent } from './courses/accounting-course/accounting-course';
import { FinanceCourseComponent } from './courses/finance-course/finance-course';
import { MarketingCourseComponent } from './courses/marketing-course/marketing-course';
import { EntrepreneurshipCourseComponent } from './courses/entrepreneurship-course/entrepreneurship-course';

import { CourseDetailComponent } from './courses/course-detail/course-detail';
import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'contabilidad', component: AccountingCourseComponent },
  { path: 'finanzas', component: FinanceCourseComponent },
  { path: 'marketing', component: MarketingCourseComponent },
  { path: 'emprendimiento', component: EntrepreneurshipCourseComponent },
  {
    path: 'lesson/:category/:id',
    component: CourseDetailComponent,
  },
  { path: '**', redirectTo: '' }
];