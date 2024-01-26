import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  path:string;
  imagePreview:any;
  constructor(private fb:FormBuilder,
    private usersService:UsersService,
    private router:Router) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,10}$/)]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      Adresse:[''],
      img:[''],
      
    })
  }


  signup(){
    console.log("signup clicked", this.signupForm.value);
    this.path = this.router.url;
    this.signupForm.value.role = this.path == "/signup" ? "student" : "admin";
    this.usersService.signup(this.signupForm.value,this.signupForm.value.img).subscribe((data) => {
      console.log("here data after signup", data);
      this.router.navigate(["login"])
    });
      
    }
    onImageSelected(event: Event) {
      const file = (event.target as HTMLInputElement).files[0];
      this.signupForm.patchValue({ img: file });
      this.signupForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
      this.imagePreview = reader.result as string
      };
      reader.readAsDataURL(file);
      }

}
