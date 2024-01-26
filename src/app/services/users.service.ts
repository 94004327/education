import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersUrl:string="http://localhost:3000/users"
  constructor(private httpClient:HttpClient) { }
  getAllUsers() {
    return this.httpClient.get<{ userTab:any }>(this.usersUrl);
  }
 

  signupTeachers(user:any,img:File, pdf: File) {
    let fData= new FormData
    fData.append("firstName",user.firstName);
    fData.append("lastName",user.lastName);
    fData.append("email",user.email);
    fData.append("password",user.password);
    fData.append("tel",user.tel);
    fData.append("Specialite",user.Specialite);
    fData.append("role",user.role);
    fData.append("img", img);
    fData.append("pdf", pdf);

    return this.httpClient.post<{ msg: any }>(`${this.usersUrl}/signupTeacher`,fData);
  }
  signup(user:any,img:File) {
    let fData= new FormData
    fData.append("firstName",user.firstName)
    fData.append("lastName",user.lastName)
    fData.append("email",user.email)
    fData.append("password",user.password)
    fData.append("tel",user.tel)
    fData.append("role",user.role)
    fData.append("img",img)

    return this.httpClient.post<{ msg: any }>(`${this.usersUrl}/signup`,fData);
  }

  signupParent(user:any) {

    return this.httpClient.post<{ msg: any }>(`${this.usersUrl}/signupParent`,user);
  }
//  tel: user.tel,
   login(user) {
  return this.httpClient.post<{ msg: string, token: any }>(
    `${this.usersUrl}/login`,
    user
  );
}
// request=recuperer un seul objet .
getUserById(id) {
  return this.httpClient.get<{ findedUser: any }>(`${this.usersUrl}/${id}`);
}
updateUsers(obj) {
  return this.httpClient.put<{ findedUsers: any }>(`${this.usersUrl}/${obj._id}`, obj);
}


//request=supperimer un objet par id.
deleteUses(id:any){
  return this.httpClient.delete<{message:any}>(`${this.usersUrl}/${id}`);
}
  // Ajoutez une méthode spécifique pour valider les enseignants
validateTeacher(teacherId: number) {
  const url = `${this.usersUrl}/updateValidationStatus/${teacherId}`;
  return this.httpClient.put<{msg:any}>(url, {});
}
 //request search teachear by specialite
 search(a: any) {
  return this.httpClient.post<{ t: any }>(`${this.usersUrl}/searchSpeacialite`, a);
}
// getStudentsByTeacherId(teacherId: string) {
//   // Utilisez le chemin correct dans l'URL
//   return this.httpClient.get<{ usersTab: any }>(`${this.usersUrl}/teacher/${teacherId}`);
// }
getStudentsByTeacherAndCourseId(teacherId: string, courseId: string) {
  return this.httpClient.get<{ usersTab: any }>(`${this.usersUrl}/teacher/${teacherId}/students/${courseId}`);
}






}
