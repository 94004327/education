
  

 import { Component, OnInit } from '@angular/core';
 import { UsersService } from 'src/app/services/users.service';
 
 @Component({
   selector: 'app-teachers',
   templateUrl: './teachers.component.html',
   styleUrls: ['./teachers.component.css']
 })
 export class TeachersComponent implements OnInit {
   teachers: any[] = [];
 
   constructor(private usersServices: UsersService) {}
 
   ngOnInit() {
     this.usersServices.getAllUsers().subscribe(
       (data) => {
         console.log("here response", data);
 
         if (data && data.userTab) {
           // Filter only teachers
           this.teachers = data.userTab.filter(user => user.role === "teacher");
         }
       }
     );
   }
 }
 
