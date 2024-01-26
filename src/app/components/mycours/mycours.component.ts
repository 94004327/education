import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-mycours',
  templateUrl: './mycours.component.html',
  styleUrls: ['./mycours.component.css']
})
export class MycoursComponent implements OnInit {
  cours: any[] = [];
  obj: any = {};
  teacherId: string;
  img:any
  constructor(
    private coursService: CoursService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {

     // Retrieve the teacherId from the route parameters
     this.teacherId = this.activatedRoute.snapshot.paramMap.get('id');

     // Fetch courses for the logged-in teacher
     this.coursService.getCoursesByTeacherId(this.teacherId).subscribe(
       (data) => {
         console.log("here response", data);
         this.cours = data.couresTab;
       },
       (error) => {
         console.error("Error fetching courses", error);
       }
     );
  }
  delleteCours(id:number){
    this.coursService.deleteCours(id).subscribe(
      (data)=>{
        console.log('here after delete', data.message);
        this.coursService.getCoursesByTeacherId(this.teacherId).subscribe(
          (data) => {
            console.log("here response", data);
            this.cours = data.couresTab;
          },
          (error) => {
            console.error("Error fetching courses", error);
          }
        );
        
      }
    )
  }

  goToDisplay(id:number){
    this.router.navigate([`displayCours/${id}`]);
  }
  goToEdit(id:number){
    this.router.navigate([`editCours/${id}`]);
  }

}
