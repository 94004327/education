// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { CoursService } from 'src/app/services/cours.service';
// import { UsersService } from 'src/app/services/users.service';

// @Component({
//   selector: 'app-display-cours',
//   templateUrl: './display-cours.component.html',
//   styleUrls: ['./display-cours.component.css']
// })
// export class DisplayCoursComponent implements OnInit {
//   coursesId: any;
//   students: any;
//   findedCourses: any;
//   constructor(private activatedRoute:ActivatedRoute,
//     private coursService:CoursService,private usersService:UsersService) { }

//   ngOnInit() {
//     this.coursesId = this.activatedRoute.snapshot.paramMap.get('id');
//     console.log("affiche id",this.coursesId);
    
//     this.coursService.getCoursById(this.coursesId).subscribe(
//       (data)=>{
//         console.log("here reponse", data);
//             console.log("here coursTab", data.findedCoures);
//             this.findedCourses = data.findedCoures
//       }
      
//     )

//     this.usersService.getAllUsers().subscribe(
//       (data) => {
//         console.log("Response from server:", data);

//         if (data && data.userTab) {
          
//           this.students = data.userTab.filter(user => user.role === "student");
//         }
//       },
//       (error) => {
//         console.error("Error fetching users:", error);
//       }
//     );
//   }
 
 
//   effectue(studentId: string) {
//     console.log("here studentId", studentId);
  
//     // Utilisez un tableau pour stocker les IDs des étudiants à affecter
//     const studentsArray = [studentId];
  
//     this.coursService.effectuerCours(this.coursesId, studentsArray)
//       .subscribe(
//         (data) => {
//           console.log("Response from server:", data.message);
//           console.log("here coursesId", this.coursesId);
//           // Mettez à jour votre liste d'étudiants ou effectuez d'autres actions nécessaires.
//         },
//         (error) => {
//           console.error("Error performing course:", error);
//         }
//       );
//   }




  
//   }


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-display-cours',
  templateUrl: './display-cours.component.html',
  styleUrls: ['./display-cours.component.css']
})
export class DisplayCoursComponent implements OnInit {
  coursesId: any;
  students: any;
  findedCourses: any;

 

  constructor(private activatedRoute: ActivatedRoute,
              private coursService: CoursService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.coursesId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log("affiche id", this.coursesId);

    this.coursService.getCoursById(this.coursesId).subscribe(
      (data) => {
        console.log("here reponse", data);
        console.log("here coursTab", data.findedCoures);
        this.findedCourses = data.findedCoures;
      }
    );

    this.usersService.getAllUsers().subscribe(
      (data) => {
        console.log("Response from server:", data);

        if (data && data.userTab) {
          this.students = data.userTab.filter(user => user.role === "student").map(student => {
            return {
              ...student,
              courseCompleted: false
            };
          });
        }
      },
      (error) => {
        console.error("Error fetching users:", error);
      }
   
    );



  }
  

 

  


  effectue(student: any) {
    console.log("here student", student);
  
    const studentsArray = [student._id];
  
    this.coursService.effectuerCours(this.coursesId, studentsArray)
      .subscribe(
        (data) => {
          console.log("Response from server:", data.message);
          console.log("here coursesId", this.coursesId);
          student.courseCompleted = true;
        },
        (error) => {
          console.error("Error performing course:", error);
          // Ajoutez du code pour gérer l'erreur côté client
        }
      );
  }
}


  
  
  
  
  




