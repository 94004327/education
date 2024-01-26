import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursComponent } from './components/cours/cours.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { PackagesComponent } from './components/packages/packages.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { NewsComponent } from './components/news/news.component';
import { LoginComponent } from './components/login/login.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';

import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { ProfileComponent } from './components/profile/profile.component';

import { DisplayCoursComponent } from './components/display-cours/display-cours.component';

import { DashboardTeachersComponent } from './components/dashboard-teachers/dashboard-teachers.component';
import { EvalutionFormComponent } from './components/evalution-form/evalution-form.component';
import { SearchTeacherByspecialiteComponent } from './components/search-teacher-byspecialite/search-teacher-byspecialite.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { DisplayEvaluationComponent } from './components/display-evaluation/display-evaluation.component';
import { CoursStudentComponent } from './components/cours-student/cours-student.component';
import { SearchCouresByTelComponent } from './components/search-coures-by-tel/search-coures-by-tel.component';

import { CoursFormComponent } from './components/cours-form/cours-form.component';



const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"cours",component:CoursComponent},
  {path:"teachers",component:TeachersComponent},
  {path:"subscription",component:SubscriptionComponent},
  {path:"packages",component:PackagesComponent},
  {path:"testimonial",component:TestimonialComponent},
  {path:"news",component:NewsComponent},
  {path:"login",component:LoginComponent},
  {path:"signupTeacher",component:SignupTeacherComponent},
  {path:"signup",component:SignupComponent},
  {path:"signupParent",component:SignupParentComponent},
  {path:"signupAdmin",component:SignupComponent},
 
  {path:"admin",component:AdminComponent},
  {path:"dashbordTeacher/:id",component:DashboardTeachersComponent},
  // {path:"dashbordStudent/:studentId",component:DashboardStudentComponent},
  {path:"coursStudent/:studentId",component:CoursStudentComponent},
  {path:"profile/:id",component:ProfileComponent},
  {path:"evaltion",component:EvalutionFormComponent},
  {path:"displayCours/:id",component:DisplayCoursComponent},
  {path:"search",component:SearchTeacherByspecialiteComponent},
  {path:"searchTel",component:SearchCouresByTelComponent},
  {path:"displayEvalution/:courseId",component:DisplayEvaluationComponent},
 
  {path:"addFormCours",component:CoursFormComponent},
  {path:"editCours/:id",component:CoursFormComponent},

 
  

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
