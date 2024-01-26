import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.css']
})
export class MyStudentsComponent implements OnInit {
  students: any[] ;
  teacherId: string;
  courses:any;
  courseId: string; 
  noStudentsMessage:string="";
 
  errorMsg: string = "";
  constructor(private usersServices:UsersService,
    private coursService:CoursService,
    private activatedRoute: ActivatedRoute,
    private router:Router) { }

  ngOnInit() {
    this.teacherId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("afiiche id ",this.teacherId);
    
    this.coursService.getCourseByTeacherId(this.teacherId).subscribe((data) => {
      this.students = data.allStudents;
      this.courses = data.courses;
      console.log("are students", this.students);
      
    });
 
  }

   goToDisplay(id:any){
    this.router.navigate([`profile/${id}`]);
   }

}
