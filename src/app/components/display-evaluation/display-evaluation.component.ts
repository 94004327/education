import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { EvalutionService } from 'src/app/services/evalution.service';

@Component({
  selector: 'app-display-evaluation',
  templateUrl: './display-evaluation.component.html',
  styleUrls: ['./display-evaluation.component.css']
})
export class DisplayEvaluationComponent implements OnInit {
  courseId:any;
  notesAndEvaluations: any[] = [];
  courseDetails: { [key: string]: string } = {}; // Utilisation d'un objet pour stocker les détails des cours
  constructor(private evalutionService:EvalutionService,
    private activatedRouter:ActivatedRoute,private coursServices:CoursService) { }


    ngOnInit() {
      this.courseId = this.activatedRouter.snapshot.paramMap.get('courseId');
    
      if (this.courseId) {
        console.log('donne moi le courseId', this.courseId);
    
        this.evalutionService.getNotesAndEvaluationsByCourseId(this.courseId).subscribe(
          (data) => {
            this.notesAndEvaluations = data.notesAndEvaluationsStudent;
            console.log('Notes et évaluations du cours:', this.notesAndEvaluations);
    
            // Récupérez les détails du cours pour chaque courseId
            this.notesAndEvaluations.forEach((evaluation, index) => {
              this.coursServices.getCoursById(evaluation.courseId).subscribe(
                (data) => {
                  console.log('here is cours obj', data.findedCoures);
                  
                  // Stockez les détails du cours dans l'objet courseDetails de chaque évaluation
                  this.notesAndEvaluations[index].courseDetails = data.findedCoures;
                },
                (error) => {
                  console.error('Erreur lors de la récupération des détails du cours:', error);
                }
              );
            });
          },
          (error) => {
            console.error('Erreur lors de la récupération des notes et évaluations:', error);
          }
        );
      } else {
        console.error('ID du cours invalide');
      }
    }
    
  
}
