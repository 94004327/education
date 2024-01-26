import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  usersId:any;
  findedUsers:any;
  constructor(private usersServices:UsersService,private activatedRouter:ActivatedRoute,private router:Router ) { }

  ngOnInit() {

    this.usersId=this.activatedRouter.snapshot.paramMap.get('id');
    this.usersServices.getUserById(this.usersId).subscribe(
      (data)=>{
        console.log('here is users obj',data.findedUser);
        this.findedUsers=data.findedUser;
      }
     );
  }

  // Edit() {
  //   // Vérifiez si this.findedUsers est défini avant de faire la demande HTTP
  //   if (this.findedUsers) {
  //     this.usersServices.updateUsers(this.findedUsers).subscribe((data) => {
  //       console.log("here after edit", data);
  //       this.router.navigate(["admin"]);
  //     });
  //   } else {
  //     console.error('Cannot update user: user data is undefined');
  //     // Ajoutez ici une logique de gestion des erreurs si nécessaire
  //   }
  // }
  

}
