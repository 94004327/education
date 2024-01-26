import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup-parent',
  templateUrl: './signup-parent.component.html',
  styleUrls: ['./signup-parent.component.css']
})
export class SignupParentComponent implements OnInit {
  signupParentForm:FormGroup;
  path:string;
  constructor(private fb:FormBuilder,
    private usersService:UsersService,
    private router:Router) { }

  ngOnInit() {
    this.signupParentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,10}$/)]],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      telParent:[''],
      Adresse:[''],
      
    })
  }
  

  signupParent() {
    console.log('signup clicked', this.signupParentForm.value);
    this.signupParentForm.value.role = "parent"
    this.usersService.signupParent(this.signupParentForm.value).subscribe(
        (data) => {
            console.log('here data after signup', data);
            alert('Inscription réussie !');
            // Vous pouvez également rediriger l'utilisateur vers une autre page ici si nécessaire
        },
        (error) => {
            console.error('here error after signup', error);
            alert(error.error.msg); // Affichez le message d'erreur du serveur
        }
    );
}

  

}



