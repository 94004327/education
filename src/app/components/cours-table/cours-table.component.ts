import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-cours-table',
  templateUrl: './cours-table.component.html',
  styleUrls: ['./cours-table.component.css']
})
export class CoursTableComponent implements OnInit {
  cours:any=[];
  constructor(private coursService:CoursService ,private router:Router) { }

  ngOnInit() {
     // appel de la methode du service
     this.coursService.getAllCours().subscribe(
      (data)=> {
        console.log("here reponse", data);
        
      
        this.cours = data.couresTab;
     
        
      }
    );
  }


  goToDisplay(id:number){
    this.router.navigate([`displayCours/${id}`]);
  }
  goToEdit(id:number){
    this.router.navigate([`editCours/${id}`]);
  }
  delleteCours(id:number){
  this.coursService.deleteCours(id).subscribe(
    (data)=>{
      console.log('here after delete', data.message);
      this.coursService.getAllCours().subscribe(
        (data)=> {
          console.log("here reponse", data);
          
        
          this.cours = data.couresTab;
       
          
        }
      );
      
    }
  )
  }

}
