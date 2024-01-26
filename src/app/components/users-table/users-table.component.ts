import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users:any=[];
  constructor(private usersService:UsersService, 
    private router:Router) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(
      (data)=> {
        console.log("here reponse", data);
        this.users = data.userTab;
      });
  }
  goToDisplayUser(id: number) {
    this.router.navigate([`profile/${id}`]);
  }
 
  delleteUsers(id:number){
    this.usersService.deleteUses(id).subscribe(
      (data)=>{
        console.log('here after delete', data.message);
        this.usersService.getAllUsers().subscribe(
          (data)=>{
            this.users = data.userTab;
          }
        )
        
      }
    )
    }
     // Ajoutez une méthode pour valider les enseignants
  
validateTeacher(teacherId: number) {
  this.usersService.validateTeacher(teacherId).subscribe((data) => {
      console.log('Teacher validation response', data.msg);
      // Rafraîchissez la liste des utilisateurs après la validation
      this.usersService.getAllUsers().subscribe((data) => {
          this.users = data.userTab;
      });
  });
}


}
