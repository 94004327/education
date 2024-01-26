import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  obj: any = {};
  errorMsg: string = "";
  error: string = "";

  constructor(private userService: UsersService, 
    private router: Router) {}

  ngOnInit() {}


login() {
  this.userService.login(this.obj).subscribe((data) => {
    console.log("here data", data);
    if (data.token) {
       // console.log("here success");
      sessionStorage.setItem("jwt",data.token)
     
      let user:any =this.decodeToken(data.token);
      if (user.role === 'teacher') {
        if (!user.status) {
          // Account is pending validation, display a message to the user
          this.error = "Your account is pending validation by the admin. Please wait for approval.";
        } else {
          // Store the _id of the teacher
          const userId = user.id;
          
          this.router.navigate([`dashbordTeacher/${userId}`]); // Update with the actual route
        }
      }
       else if (user.role === 'student') {
        const studentId = user.id;
        this.router.navigate([`coursStudent/${studentId}`]); // Update with the appropriate route
      } 
      else if (user.role === 'admin') {
        this.router.navigate([`admin`]);
      }
      else {
        // Default case when role is neither 'teacher' nor 'student'
        this.router.navigate([``]); // Update with the appropriate route
      }
    } 
    else {
      this.error = "Please check email/pwd";
    }
  });
}

decodeToken(token:string){
  return jwt_decode(token);
}
  
}

