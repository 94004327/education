import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-search-teacher-byspecialite',
  templateUrl: './search-teacher-byspecialite.component.html',
  styleUrls: ['./search-teacher-byspecialite.component.css']
})
export class SearchTeacherByspecialiteComponent implements OnInit {
  searchTeacherForm: FormGroup;
  obj: any = {};
  teachers: any[] = [];
  msg: string ="";

  constructor(private router: Router, private usersServices: UsersService) {
      this.searchTeacherForm = new FormGroup({
          // Define your form controls here if needed
      });
  }

  ngOnInit() {
   
  }

searchTeacherBySpecialite() {
    // Assuming you want to navigate to the 'search' route
    this.router.navigate(['/search']);

    this.usersServices.search(this.obj).subscribe(
        (data) => {
            console.log('here is data', data);
            if (data.t && data.t.length > 0) {  // Ajoutez cette condition pour vérifier si des enseignants sont trouvés
                console.log('teacher with specialite:', data.t);
                this.teachers = data.t;
                this.msg = '';
            } else {
                this.teachers = [];
                this.msg = "No teacher found with the specified specialite";
                console.log("rien de teacher de votre specialite", this.msg);
            }
        },
        (error) => {
            console.error("Error searching by specialite:", error);
            this.msg = "Error searching for teachers. Please try again later.";
        }
    );
}




 
}

