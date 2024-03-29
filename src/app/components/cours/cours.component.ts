import { Component, OnInit } from '@angular/core';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {
  cours:any=[];
  constructor(private coursSercive:CoursService) { }

  ngOnInit() {
// appel de la methode du service
this.coursSercive.getAllCours().subscribe(
  (data)=> {
    console.log("here reponse", data.couresTab);
    
    this.cours = data.couresTab;
    
  }
 );


  }

}
