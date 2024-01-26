import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-cours-form',
  templateUrl: './cours-form.component.html',
  styleUrls: ['./cours-form.component.css']
})
export class CoursFormComponent implements OnInit {
  coursForm: FormGroup;
  title: string = "Ajouter Cours";
  error: string = "";
  coursesId: any;
  obj: any = {};
  imagePreview:any;

  constructor(private fb: FormBuilder, private coursService: CoursService, private router: Router,
    private activatedRouter:ActivatedRoute) { }

  ngOnInit() {
    this.coursForm = this.fb.group({
      nom: [''],
      discription: [''],
      duree: [''],
      seat: [''],
      price: [''],
      img:[''],
    });
    
    this.coursesId = this.activatedRouter.snapshot.paramMap.get("id");

    if (this.coursesId) {
      this.title = "Edit Course";
      this.coursService.getCoursById(this.coursesId).subscribe(
        (data) => {
          console.log('here data',data.findedCoures);
          this.coursForm.patchValue({
            nom: data.findedCoures.nom,
            discription: data.findedCoures.discription,
            duree: data.findedCoures.duree,
            seat: data.findedCoures.seat,
            price: data.findedCoures.price,
          });
          
       
        },
        (error) => {
          console.error("Error fetching course details:", error);
        }
      );
    }


  }
  // addOrEdit() {
  //   const formData = this.coursForm.value;
  //   console.log('here add cours', formData);
  
  //   const token = sessionStorage.getItem('jwt');
  
  //   console.log("Token before decoding:", token);
  
  //   if (!token) {
  //     console.error("Token is missing or invalid");
  //     return;
  //   }
  
  //   try {
  //     const user: any = this.decodeToken(token);
  //     console.log("Decoded user:", user);
  //     if (this.coursesId) {
  //       // Edit
  //       this.coursService.updateCours(this.coursesId, formData).subscribe(
  //         (data) => {
  //           console.log('Course edited successfully', data);
  //           this.router.navigate(['admin']);
  //         },
  //         (error) => {
  //           console.error("Error editing course:", error);
  //         }
  //       );
  //     } else if (user.role === 'teacher') {  // Ajoutez un "else" ici
  //       const userId = user.id;
  //       console.log("here teacherId", userId);
  
  //       this.coursService.addCours(formData, userId).subscribe(
  //         (data) => {
  //           console.log("Server response:", data);
  //         },
  //         (error) => {
  //           console.error("Error adding course:", error);
  //         }
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error decoding token:", error);
  //   }
  // }
  addOrEdit() {
    const formData = this.coursForm.value;
    console.log('here add cours', formData);
  
    const token = sessionStorage.getItem('jwt');
  
    console.log("Token before decoding:", token);
  
    if (!token) {
      console.error("Token is missing or invalid");
      return;
    }
  
    try {
      const user: any = this.decodeToken(token);
      console.log("Decoded user:", user);
      if (this.coursesId) {
        // Edit
        this.coursService.updateCours(this.coursesId, formData).subscribe(
          (data) => {
            console.log('Course edited successfully', data);
            this.router.navigate(['admin']);
          },
          (error) => {
            console.error("Error editing course:", error);
          }
        );
      } else if (user.role === 'teacher') {
        const userId = user.id;
        console.log("here teacherId", userId);
  
        // Corrected call to addCours function
        this.coursService.addCours(formData, formData.img, userId).subscribe(
          (data) => {
            console.log("Server response:", data);
          },
          (error) => {
            console.error("Error adding course:", error);
          }
        );
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }
  


  decodeToken(jwt: string) {
    return jwt_decode(jwt);
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.coursForm.patchValue({ img: file });
    this.coursForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }

  
}


 