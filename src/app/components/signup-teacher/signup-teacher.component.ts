
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-signup-teacher',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.css']
})
export class SignupTeacherComponent implements OnInit {
  signupTeachersForm: FormGroup;
  path: string;
  imagePreview:any;
  cvPreview:any;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.signupTeachersForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{5,10}$/
          )
        ]
      ],
      tel: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      Adresse: [''],
      Specialite: [''],
      img:[''],
      cv:[''],
    });
  }

  signupTeachers() {
    console.log("signup clicked", this.signupTeachersForm.value);
    this.path = this.router.url;
    this.signupTeachersForm.value.role = "teacher";

    // Effectuez l'inscription
    this.usersService.signupTeachers(this.signupTeachersForm.value,this.signupTeachersForm.value.img, this.signupTeachersForm.value.cv).subscribe(
      (data) => {
        console.log("here data after signup", data);

        // Si l'inscription est réussie, effectuez la connexion automatique
        if (data.msg === "Added with success") {
          this.router.navigate(["login"])
        }
      },
      (error) => {
        console.error(" error", error);
      }
    );
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.signupTeachersForm.patchValue({ img: file });
    this.signupTeachersForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

   



 onImageSelectedCv(event: Event) {
 const file = (event.target as HTMLInputElement).files[0];
 this.handleSelectedFile(file);
      }
 private handleSelectedFile(file: File) {
        if (file && file.type === 'application/pdf') {
          this.signupTeachersForm.patchValue({ cv: file });
          this.signupTeachersForm.updateValueAndValidity();
          const reader = new FileReader();
          reader.onload = () => {
            const pdfDataUrl = reader.result as string;
            this.cvPreview = this.sanitizer.bypassSecurityTrustResourceUrl(pdfDataUrl);
          };
          reader.readAsDataURL(file);
        } else {
          // Handle the case where a non-PDF file is selected (optional)
          console.log('Please select a PDF file.');
        }
      }
    }



