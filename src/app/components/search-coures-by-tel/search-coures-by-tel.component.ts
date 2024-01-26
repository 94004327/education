import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CoursService } from 'src/app/services/cours.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-search-coures-by-tel',
  templateUrl: './search-coures-by-tel.component.html',
  styleUrls: ['./search-coures-by-tel.component.css']
})
export class SearchCouresByTelComponent implements OnInit {
  obj = { tel: '' }; // Assurez-vous que obj est correctement initialisé
    childCourses: any[]; // Assurez-vous que le type correspond à la structure attendue des données
    errorMsg: string;
  constructor(private coursServices:CoursService,private usersService:UsersService) { }

  ngOnInit() {
  }
  
  searchCoursByTel() {
    this.coursServices.getChildCoursesByPhoneNumber(this.obj.tel).subscribe(
        (data) => {
            this.childCourses = data.childCourses;
            console.log('Cours de l\'enfant:', this.childCourses);
        },
        (error) => {
            console.error('Erreur lors de la recherche des cours de l\'enfant:', error);
            this.errorMsg = 'Erreur lors de la recherche des cours de l\'enfant';
        }
    );
}

}


