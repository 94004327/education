import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursComponent } from './components/cours/cours.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { PackagesComponent } from './components/packages/packages.component';
import { DescriptionComponent } from './components/description/description.component';
import { BannerComponent } from './components/banner/banner.component'
import { NewsComponent } from './components/news/news.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { CourseComponent } from './components/course/course.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { LoginComponent } from './components/login/login.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';

import { CoursTableComponent } from './components/cours-table/cours-table.component';
import { AdminComponent } from './components/admin/admin.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { HttpClientModule } from '@angular/common/http';
import { DisplayCoursComponent } from './components/display-cours/display-cours.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { ProfileComponent } from './components/profile/profile.component';

import { DashboardTeachersComponent } from './components/dashboard-teachers/dashboard-teachers.component';
import { EvalutionFormComponent } from './components/evalution-form/evalution-form.component';
import { SearchTeacherByspecialiteComponent } from './components/search-teacher-byspecialite/search-teacher-byspecialite.component';
import { MycoursComponent } from './components/mycours/mycours.component';
import { MyStudentsComponent } from './components/my-students/my-students.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { CoursStudentComponent } from './components/cours-student/cours-student.component';
import { DisplayEvaluationComponent } from './components/display-evaluation/display-evaluation.component';
import { SearchCouresByTelComponent } from './components/search-coures-by-tel/search-coures-by-tel.component';

import { CoursFormComponent } from './components/cours-form/cours-form.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CoursComponent,
    TeachersComponent,
    SubscriptionComponent,
    PackagesComponent,
    DescriptionComponent,
    BannerComponent,
    NewsComponent,
    TestimonialComponent,
    CourseComponent,
    TeacherComponent,
    LoginComponent,
    SignupTeacherComponent,
   
    CoursTableComponent,
    AdminComponent,
    UsersTableComponent,
    DisplayCoursComponent,
    SignupComponent,
    SignupParentComponent,
    ProfileComponent,
  
    DashboardTeachersComponent,

    EvalutionFormComponent,

    SearchTeacherByspecialiteComponent,

    MycoursComponent,

    MyStudentsComponent,

    DashboardStudentComponent,

    CoursStudentComponent,

    DisplayEvaluationComponent,

    SearchCouresByTelComponent,

  

    CoursFormComponent,
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
