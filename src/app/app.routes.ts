import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { LoginComponent } from './auth/login/login';
import { SignupComponent } from './auth/signup/signup';
import { CourseListComponent } from './courses/course-list/course-list';
import { CourseDetailComponent } from './courses/course-detail/course-detail';
import { SubscriptionFormComponent } from './subscriptions/subscription-form/subscription-form';
import { AuthGuard } from './core/guards/guards/auth-guard';
import { AccountingCourseComponent } from './courses/accounting-course/accounting-course';

export const routes: Routes = [
  {path: 'accounting', component: AccountingCourseComponent},
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'courses', component: CourseListComponent },
  { 
    path: 'course/:category', 
    component: CourseDetailComponent
  },
  { 
    path: 'subscription', 
    component: SubscriptionFormComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];