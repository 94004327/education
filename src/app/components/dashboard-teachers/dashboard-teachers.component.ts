
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-dashboard-teachers',
  templateUrl: './dashboard-teachers.component.html',
  styleUrls: ['./dashboard-teachers.component.css']
})
export class DashboardTeachersComponent implements OnInit {

  

  constructor(
    private coursService: CoursService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
   
   
  }


 

  
}



