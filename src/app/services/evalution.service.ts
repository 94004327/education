import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EvalutionService {
   // Remplacez par l'URL de votre serveur
  noteUrl:string="http://localhost:3000"
  constructor(private httpClient:HttpClient) { }

  addNote(obj:any) {

    return this.httpClient.post<{msg:any}>(`${this.noteUrl}/note/addNote`,obj);
  }
    // Méthode pour récupérer les notes et les évaluations d'un cours par son ID
    getNotesAndEvaluationsByCourseId(courseId: string) {
      return this.httpClient.get<{ notesAndEvaluationsStudent:any}>(`${this.noteUrl}/courses/${courseId}/notes`);
    }
  


  

}
