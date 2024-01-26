
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { CoursService } from 'src/app/services/cours.service';
// import { EvalutionService } from 'src/app/services/evalution.service';
// import { UsersService } from 'src/app/services/users.service';
// import { log } from 'util';

// @Component({
//   selector: 'app-evalution-form',
//   templateUrl: './evalution-form.component.html',
//   styleUrls: ['./evalution-form.component.css']
// })
// export class EvalutionFormComponent implements OnInit {
//   obj: any = {};
//   evaluationForm: FormGroup;
//   coursList: any[];
//   studentList: any[];
//   id: string;
//   courseId: string;
//   teacherId: string;

//   constructor(
//     private evaluationService: EvalutionService,
//     private coursService: CoursService,
//     private usersService: UsersService,
//     private activatedRouter: ActivatedRoute,
//     private formBuilder: FormBuilder
//   ) {}

//   ngOnInit() {
//     this.evaluationForm = this.formBuilder.group({
//       courseId: '',
//       studentId: '',
//       note: '',
//       evaluation: ''
//     });

//     this.teacherId = this.activatedRouter.snapshot.paramMap.get('id');
//     this.coursService.getstudentBycoursId(this.teacherId).subscribe(
//       (data) => {
//         this.coursList = data.coursesWithStudents;
//         console.log("are students", this.coursList);
    
//         if (data.coursesWithStudents && data.coursesWithStudents.length > 0) {
//           // Utilisez this.coursList[0].students au lieu de data.listStudents
//           this.studentList = data.coursesWithStudents[0].students;
//           console.log("are students", this.studentList);
//         }
//       },
//       (error) => {
//         console.error("Error fetching data:", error);
//         // Faites quelque chose pour gérer l'erreur côté client
//       }
//     );
    


//   }

//   addNote() {
//     this.obj = {
//       ...this.evaluationForm.value,
//       studentId: this.evaluationForm.value.studentId || null
//     };

//     console.log(this.evaluationForm.value);

//     this.evaluationService.addNote(this.obj).subscribe(
//       (data) => {
//         console.log("Server response:", data);

//         if (data.msg === 'note Not Found') {
//           console.error("note Not Found");
//         } else {
//           console.log("note added successfully");
//         }
//       },
//       (error) => {
//         console.error("Error adding note:", error);
//       }
//     );
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursService } from 'src/app/services/cours.service';
import { EvalutionService } from 'src/app/services/evalution.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-evalution-form',
  templateUrl: './evalution-form.component.html',
  styleUrls: ['./evalution-form.component.css']
})
export class EvalutionFormComponent implements OnInit {
  obj: any = {};
  evaluationForm: FormGroup;
  coursList: any[];
  studentList: any[];
  id: string;
  courseId: string;
  successMessage: string = '';
  teacherId: string;
  showStudentSelect: boolean = false;

  constructor(
    private evaluationService: EvalutionService,
    private coursService: CoursService,
    private usersService: UsersService,
    private activatedRouter: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  
  ngOnInit() {
    this.evaluationForm = this.formBuilder.group({
      courseId: '',  // Remove studentId from the form, as it will be dynamically populated
      note: '',
      evaluation: '',
      studentId:'',
    });
  
    this.teacherId = this.activatedRouter.snapshot.paramMap.get('id');
  
    // Utilize the service getCoursesByTeacherId to retrieve the list of courses
    this.coursService.getCourseByTeacherId(this.teacherId).subscribe(
      (data) => {
        this.coursList = data.courses;
        console.log("are cours ", this.coursList);

        // Ensure that the courseId is initialized with the first value of coursList
        if (this.coursList && this.coursList.length > 0) {
          this.onCourseSelectionChange(this.coursList[0]._id); // Update the student list
        }
      },
      (error) => {
        console.error("Error fetching course data:", error);
        // Handle the error on the client side
      }
    );
  }
  
  onCourseSelectionChange(selectedCourseId: string) {
    this.usersService.getStudentsByTeacherAndCourseId(this.teacherId, selectedCourseId).subscribe(
      (data) => {
        this.studentList = data.usersTab;
        console.log("are student ", this.studentList);
        // Show the student select only if there are students available
        this.showStudentSelect = this.studentList && this.studentList.length > 0;
      },
      (error) => {
        console.error("Error fetching student data:", error);
        // Handle the error on the client side
      }
    );
  }




  addNote() {
    this.obj = {
      ...this.evaluationForm.value,
      studentId: this.evaluationForm.value.studentId || null
    };

    console.log(this.evaluationForm.value);

    this.evaluationService.addNote(this.obj).subscribe(
      (data) => {
        console.log("Server response:", data);

        if (data.msg === 'note Not Found') {
          console.error("note Not Found");
        } else {
          console.log("note added successfully");
          this.successMessage = "Note added successfully";
        }
      },
      (error) => {
        console.error("Error adding note:", error);
      }
    );
  }
}

  
  
  

  
  


 

  

