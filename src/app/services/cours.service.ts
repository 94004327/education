import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CoursService {
  courshUrl:string="http://localhost:3000/courses"
  constructor(private httplClient:HttpClient) { }
  // methode du services pour l'envoyer l'obj 
  // addCours(formData: any, userId: string) {
  //   const dataWithUserId = { ...formData, userId };
   
  
  //   return this.httplClient.post<{ message: any }>(this.courshUrl, dataWithUserId);
  // }


  addCours(courseData: any, img: File, userId: string) {
    const formData = new FormData();
    formData.append('nom', courseData.nom);
    formData.append('discription', courseData.discription);
    formData.append('duree', courseData.duree);
    formData.append('price', courseData.price);
    formData.append('img', img);
    formData.append('userId', userId);  // Include userId in the formData
  
    return this.httplClient.post<{ msg: string, token: any }>(`${this.courshUrl}`, formData);
  }
  
  

  

// request=recuperer tous le tableau d'objet .
  getAllCours() {
    return this.httplClient.get<{couresTab:any}>(this.courshUrl);
  }
// request=recuperer un seul objet .
  getCoursById(id:any){
    return this.httplClient.get<{findedCoures:any}>(`${this.courshUrl}/${id}`);
  }
  //request=modifier un objet
// updateCours(obj:any){
//   return this.httplClient.put<{msg:string}>(this.courshUrl,obj);
// }
//request=supperimer un objet par id.
deleteCours(id:any){
  return this.httplClient.delete<{message:any}>(`${this.courshUrl}/${id}`);
}
// Recuperer les cours par ID du professeur
getCoursesByTeacherId(teacherId: string) {
  return this.httplClient.get<{couresTab: any}>(`${this.courshUrl}/teacher/${teacherId}`);
}
getCourseAndStudents(teacherId: string,courseId: string){
  return this.httplClient.get<{course:any,students:any}>(`${this.courshUrl}/courseandstudents/${teacherId}/${courseId}`)
}
updateCours(courseId: string, updatedCourse: any) {
  return this.httplClient.put<{ msg: string }>(`${this.courshUrl}/${courseId}`, updatedCourse);
}
getCoursesByStudentId(studentId: string){
  return this.httplClient.get<{courses:any}>(`${this.courshUrl}/student/${studentId}`);
}

  
  // Service Angular pour la recherche des cours par numéro de téléphone
getChildCoursesByPhoneNumber(phoneNumber: string) {
  return this.httplClient.get<any>(`${this.courshUrl}/child/${phoneNumber}`);
}
// service  de my cours et evalution
getCourseByTeacherId(id:any){
  return this.httplClient.get<{courses:any,allStudents:any}>(` ${this.courshUrl}/courseandstudents/${id}`)
  
}
//evalution de list student 
getstudentBycoursId(id:any){
  return this.httplClient.get<{student :any}>(` ${this.courshUrl}/studentsByCours/${id}`)
  
}


effectuerCours(coursesId: any, students: any[]) {
  return this.httplClient.post<{ message: any }>(`${this.courshUrl}/effectuerCours/${coursesId}`, { students });
}


}




