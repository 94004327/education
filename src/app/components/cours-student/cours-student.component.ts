
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';

@Component({
  selector: 'app-cours-student',
  templateUrl: './cours-student.component.html',
  styleUrls: ['./cours-student.component.css']
})
export class CoursStudentComponent implements OnInit {
  cours: any[] = [];
  studentId: any;

  constructor(private coursService: CoursService, private activatedRouter: ActivatedRoute,
    private router:Router) { }

  // ngOnInit() {
  //   this.studentId = this.activatedRouter.snapshot.paramMap.get('studentId');
  //   console.log('donne moi le studentId', this.studentId);
  //   // Vérifiez si studentId est défini, nul ou une chaîne vide avant d'envoyer la requête
  //   if (this.studentId !== undefined && this.studentId !== null && this.studentId !== '') {
  //     this.coursService.getCoursesByStudentId(this.studentId).subscribe(
  //       (data) => {
  //         this.cours = data.courses;
  //         console.log('Cours de l\'étudiant:', this.cours);
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la récupération des cours:', error);
  //       }
  //     );
  //   } else {
  //     console.error('ID de l\'étudiant invalide');
  //     // Vous pouvez également gérer cette condition comme vous le souhaitez
  //   }
  // }
  ngOnInit() {
    this.studentId = this.activatedRouter.snapshot.paramMap.get('studentId');
    console.log('donne moi le studentId', this.studentId);
  
    // Vérifiez si studentId est défini et non nul
    if (this.studentId) {
      this.coursService.getCoursesByStudentId(this.studentId).subscribe(
        
        (data) => {
          this.cours = data.courses;
          console.log('Cours de l\'étudiant:', this.cours);
        },
        (error) => {
          console.error('Erreur lors de la récupération des cours:', error);
        }
      );
    } else {
      console.error('ID de l\'étudiant invalide');
      // Vous pouvez également gérer cette condition comme vous le souhaitez
    }
  }
  

  goToDisplay(courseId:any){
    this.router.navigate([`displayEvalution/${courseId}`]);

  }
}



