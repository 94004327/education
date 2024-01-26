//impot express module
const express = require("express");
// import body-parser module
const bodyParser = require("body-parser");
// import bcrypt module
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const session = require('express-session');
// import mongoose module
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/educationKidesDB");
const app = express();

//configure le body-parser pour structure la reponse du BE sous format json
app.use(bodyParser.json());
//configure le body-parser pour parser le req recu du FE (accéder au contenu de l'objet )
app.use(bodyParser.urlencoded({ extended: true }));
//security config
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS, PATCH, PUT");
    next();
})
app.use('/files', express.static(path.join('backend/images')));
//type de Media
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf':'pdf',
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});
const secretKey = 'croco-omayma-23-cun';
app.use(session({
secret: secretKey,
}));

const User = require("./models/users");
const Cours = require("./models/cours");
const Note = require("./models/note");
// busines logic get allUsers 
app.get('/users', (req, res) => {
    console.log('here into all courses');
    User.find().then((docs) => {
        console.log("Here docs from DB", docs);
        res.json({ userTab: docs });
    });
});
// signup teachers

app.post("/users/signupTeacher", multer({ storage: storageConfig }).fields([{ name: 'img', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), (req, res) => {
    console.log("here signup BL", req.body);
    bcrypt.hash(req.body.password, 10).then((cryptedPwd) => {
        console.log("Here crypted pwd", cryptedPwd);
        req.body.password = cryptedPwd;
        req.body.status = false;
        req.body.avatar = `http://localhost:3000/files/${req.files['img'][0].filename}`;
        req.body.cv = `http://localhost:3000/files/${req.files['pdf'][0].filename}`;
        let user = new User(req.body);
        user.save((err) => {
            if (err) {
                console.error("Error saving user:", err);
                res.status(500).json({ msg: "Failed to save user" });
            } else {
                res.json({ msg: "Added with success" });
            }
        });
    });
});

//BL of signupStudentOuAdmin
app.post("/users/signup", multer({ storage: storageConfig }).single("img"), (req, res) => {
    console.log("here signup BL", req.body);
    bcrypt.hash(req.body.password, 10).then((cryptedPwd) => {
        console.log("Here crypted pwd", cryptedPwd);
        req.body.password = cryptedPwd;
        req.body.avatar = `http://localhost:3000/files/${req.file.filename}`;
        let user = new User(req.body);
        user.save();
        res.json({ msg: " Added with success" });
    });

});

app.post("/users/signupParent", async (req, res) => {
    console.log("here signup BL", req.body);

    // Vérifiez si le numéro de téléphone de l'enfant existe dans la liste des étudiants
    const childPhoneNumber = req.body.tel;

    const existingChild = await User.findOne({ tel: childPhoneNumber, role: "student" });

    if (!existingChild) {
        return res.status(400).json({ msg: "Le numéro de téléphone de l'enfant n'existe pas dans la liste des étudiants ou l'utilisateur n'est pas un étudiant." });
    }

    // Le numéro de téléphone de l'enfant existe et l'utilisateur est un étudiant,
    // vous pouvez maintenant enregistrer l'utilisateur parent
    let user = new User(req.body);
    ({
        role: "parent",
    });

    bcrypt.hash(req.body.password, 10).then((cryptedPwd) => {
        console.log("Here crypted pwd", cryptedPwd);
        req.body.password = cryptedPwd;
        user.save();
        res.json({ msg: " Added with success" });
    });
});
//BL of login
app.post("/users/login", (req, res) => {
    let user = req.body;
    console.log("here user", user);
    // Check If tel Exist
    User.findOne({ tel: user.tel, telParent: user.telParent }).then((doc) => {
        // tel is not found
        console.log("here doc", doc);
        if (!doc) {
            return res.json({ msg: "Please Check Your tel" });
        } else {
            // Doc is found
            // Compare Pwds
            bcrypt.compare(user.password, doc.password).then((pwdResult) => {
                if (!pwdResult) {
                    return res.json({ msg: "Please Check Pwd" });
                } else {
                    let userToSend = {
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        role: doc.role,
                        status: doc.status,
                        id: doc._id,
                    };
                    const token =jwt.sign(userToSend,secretKey,{ expiresIn:
                        '1h' })
                    
                    res.json({
                        msg: "Welcome",
                        token: token,
                    });
                }
            });
        }

    });
});

//business logic get allUser by Id
app.get('/users/:id', (req, res) => {
    console.log('here into get userBYid');
    //recuperer l'Id;
    let userId = req.params.id;
    User.findById(userId).then(
        (doc) => {
            console.log("here doc", doc);
            res.json({ findedUser: doc });
        }
    )


}
)
// busines logic to edit users
app.put("/users", (req, res) => {
    console.log("here is users obj", req.body);
    User.updateOne({ _id: req.body._id }, req.body).then((updateResponse) => {
        console.log("Here update response", updateResponse);
        if (updateResponse.nModified == 1) {
            res.json({ msg: "Success" });
        } else {
            res.json({ msg: "Error" });
        }
    });
});
// Business logic Delete user
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Supprimer l'utilisateur de la collection Users
        const deleteUserResponse = await User.deleteOne({ _id: userId });

        if (deleteUserResponse.deletedCount === 1) {
            // Supprimer l'utilisateur de la liste des enseignants dans la collection Cours
            await Cours.updateMany({ teacher: userId }, { $unset: { teacher: 1 } });
            
            // Supprimer l'utilisateur de la liste des étudiants dans la collection Cours
            await Cours.updateMany({ students: userId }, { $pull: { students: userId } });

            res.json({ message: "Success" });
        } else {
            res.json({ message: "Echec" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.put('/users/:id', (req, res) => {
    const teacherId = req.params.id;

    User.findByIdAndUpdate(teacherId, (err, teacher) => {
        if (err) {
            return res.json({ msg: 'Error validating teacher' });
        }

        res.json({ msg: 'Teacher validated successfully', teacher });
    });
});

//busines logic ti modifier e status de teacher par admin
app.put("/users/updateValidationStatus/:teacherId", (req, res) => {
    const teacherId = req.params.teacherId;

    User.findByIdAndUpdate(teacherId, { status: true }, { new: true })
        .then((updatedTeacher) => {
            if (!updatedTeacher) {
                return res.status(404).json({ msg: "Teacher not found" });
            }
            res.json({ msg: "Teacher validation status updated successfully", teacher: updatedTeacher });
        })
        .catch((err) => {
            console.error("Error updating teacher validation status:", err);
            res.status(500).json({ msg: "Internal Server Error" });
        });
});
// Correction de la route de recherche par spécialité
app.post('/users/searchSpeacialite', (req, res) => {
  console.log('here into add specialite');
  console.log('here is added specialite', req.body);
  let searchSpecialite = req.body;
  User.find({ Specialite: searchSpecialite.specialite, role: 'teacher' }, (err, teachers) => {
      if (err) {
          console.error("Error searching by specialite:", err);
          return res.status(500).json({ msg: "Internal Server Error" });
      }
      res.json({ t: teachers });
  });
});
// Business logic to add cours
// app.post('/courses',async (req, res) => {
//     try {
//       // Récupérer les données du formulaire
//       const { nom, discription, duree, seat, price, userId } = req.body;
//       console.log('here cours', req.body);
  
//       // Vérifier si userId existe
//       if (!userId) {
//         console.error('Forbidden: Teacher Not Found or Invalid Role');
//         return res.status(403).json({ message: 'Forbidden: Teacher Not Found' });
//       }
  
//       // Récupérer l'ID du professeur à partir du formulaire
//       const teacherId = userId;
//       console.log("here teacher", userId);
       
     
//       // Créer une nouvelle instance du modèle Cours
//       const newCours = new Cours({
//         nom,
//         discription,
//         duree,
//         seat,
//         price,
//         teacher: teacherId,
      
       
//       });
  
//       // Enregistrer le cours dans la base de données
//       await newCours.save();
  
//       // Ajouter l'ID du nouveau cours à l'array courses du professeur
//       const teacher = await User.findById(teacherId);
//       if (!teacher) {
//         console.error('Teacher not found');
//         throw new Error('Teacher not found'); // Throw an error to handle the case where the teacher is not found
//       }
  
//       teacher.courses.push(newCours._id);
//       await teacher.save();
  
//       res.status(201).json({ message: 'Cours ajouté avec succès' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Erreur lors de l\'ajout du cours' });
//     }
//   });

app.post('/courses', multer({ storage: storageConfig }).single("img"), async (req, res) => {
    try {
      // Récupérer les données du formulaire
      const { nom, discription, duree, seat, price, userId } = req.body;
      console.log('here cours', req.body);
  
      // Vérifier si userId existe
      if (!userId) {
        console.error('Forbidden: Teacher Not Found or Invalid Role');
        return res.status(403).json({ message: 'Forbidden: Teacher Not Found' });
      }
  
      // Récupérer l'ID du professeur à partir du formulaire
      const teacherId = userId;
      console.log("here teacher", userId);
      const avatar = `http://localhost:3000/files/${req.file.filename}`; // Use req.file.filename instead of req.files['img'][0].filename
      console.log('here avatar', avatar);
  
      // Créer une nouvelle instance du modèle Cours
      const newCours = new Cours({
        nom,
        discription,
        duree,
        seat,
        price,
        teacher: teacherId,
        avatar,
      });
  
      // Enregistrer le cours dans la base de données
      await newCours.save();
  
      // Ajouter l'ID du nouveau cours à l'array courses du professeur
      const teacher = await User.findById(teacherId);
      if (!teacher) {
        console.error('Teacher not found');
        throw new Error('Teacher not found');
      }
  
      teacher.courses.push(newCours._id);
      await teacher.save();
  
      res.status(201).json({ message: 'Cours ajouté avec succès' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout du cours' });
    }
  });
  
// busines logic get allCours 
app.get('/courses', (req, res) => {
    console.log('here into all courses');
    Cours.find().then((docs) => {
        console.log("Here docs from DB", docs);
        res.json({ couresTab: docs });
    });
});
//business logic to get cours by id
app.get("/courses/:id", (req, res) => {
    console.log("here into get coursBYId");
    //récupérer l'id
    let couresId = req.params.id;
    Cours.findById(couresId).then((doc) => {
        console.log("Here doc", doc);
        res.json({ findedCoures: doc });
    });
});
//busines logic DElete cours

// Business logic Delete cours
app.delete('/courses/:id', async (req, res) => {
    try {
        const coursId = req.params.id;

        // Supprimer le cours de la collection Cours
        const deleteCoursResponse = await Cours.deleteOne({ _id: coursId });
        
        if (deleteCoursResponse.deletedCount === 1) {
            // Supprimer le cours de la liste des cours dans la collection Users (enseignants)
            await User.updateMany({ courses: coursId }, { $pull: { courses: coursId } });
            
            // Supprimer le cours de la liste des cours dans la collection Users (étudiants)
            await User.updateMany({ students: coursId }, { $pull: { students: coursId } });

            res.json({ message: "Success" });
        } else {
            res.json({ message: "Echec" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// Business pour la mise à jour d'un cours
app.put('/courses/:id', async (req, res) => {
    try {
      const courseId = req.params.id;
      const updatedCourse = req.body;
  
      // Mise à jour du cours dans la base de données
      const result = await Cours.findByIdAndUpdate(courseId, updatedCourse, { new: true });
  
      if (result) {
        res.json({ msg: 'Mise à jour réussie', updatedCourse: result });
      } else {
        res.status(404).json({ msg: 'Cours non trouvé' });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du cours :', error);
      res.status(500).json({ msg: 'Erreur serveur' });
    }
  });
//   affiche de cours pour teacher par rapport de id
app.get('/courses/teacher/:teacherId', async (req, res) => {
    try {
        const courses = await Cours.find({ teacher: req.params.teacherId });
        res.json({ couresTab: courses });
    }
  
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});
 //
app.get('/courseandstudents', async (req, res) => {
    try {
      const teacherId = req.query.teacherId;
      const courseId = req.query.courseId;
    
      // Vérifier si le professeur enseigne le cours spécifié
      const course = await Cours.findOne({ _id: courseId, teacher: teacherId });
      
      if (!course) {
        return res.status(404).json({ message: 'Course not found for the specified teacher' });
      }
  
      // Récupérer tous les IDs des étudiants de ce cours
      const studentsIds = course.students;
  
      // Récupérer tous les détails des étudiants dont l'ID est dans la liste obtenue précédemment
      const allStudents = await User.find({ _id: { $in: studentsIds } });
  
      res.json({ course, students: allStudents });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/courses/:courseId/students', async (req, res) => {
    try {
    
      const students = await User.find({ courses: req.params.courseId });
      res.json({ students });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Fonction pour afficher les cours selon l'ID de l'étudiant
app.get('/courses/student/:studentId', async (req, res) => {
    try {
      const studentId = req.params.studentId; // Utilisez studentId au lieu de students
  
      // Vérifiez si studentId est une chaîne non nulle
      if (!studentId) {
        return res.status(400).json({ message: 'Invalid student ID' });
      }
  
      // Retrouver les cours auxquels l'étudiant est inscrit
      const courses = await Cours.find({ students: { $in: [studentId] } });
  
      res.json({ courses });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Fonction pour afficher les notes et l'evalution  selon l'ID de l'cours de chaque id student
app.get('/courses/:courseId/notes', async (req, res) => {
    try {
      const courseId = req.params.courseId;
  
      // Vérifiez si courseId est une chaîne non nulle
      if (!courseId) {
        return res.status(400).json({ message: 'Invalid course ID' });
      }
  
      // Retrouver les notes et les évaluations du cours
      const notesAndEvaluationsStudent = await Note.find({ courseId });
  
      res.json({ notesAndEvaluationsStudent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // function pour récupérer les détails du cours par son ID
app.get('/courses/:courseId', async (req, res) => {
    try {
      const courseId = req.params.courseId;
  
      // Vérifiez si courseId est une chaîne non nulle
      if (!courseId) {
        return res.status(400).json({ message: 'Invalid course ID' });
      }
  
      // Retrouvez les détails du cours par son ID
      const courseDetails = await Cours.findById(courseId);
  
      // Vérifiez si le cours existe
      if (!courseDetails) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Renvoyez les détails du cours
      res.json({ nom: courseDetails.nom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // funtion pour la recherche par numéro de téléphone
app.get('/courses/child/:phoneNumber', async (req, res) => {
    try {
        const phoneNumber = req.params.phoneNumber;

        // Trouver l'enfant par numéro de téléphone
        const child = await User.findOne({ tel: phoneNumber });

        if (!child) {
            return res.status(404).json({ error: "Child not found" });
        }

        // Trouver les cours auxquels l'enfant est inscrit
        const courses = await Cours.find({ students: { $in: [child._id] } });

        // Récupérer les évaluations du professeur associé à chaque cours
        const courseDetails = await Promise.all(courses.map(async (course) => {
            const teacher = await User.findById(course.teacher);
            const evaluation = await Note.findOne({ courseId: course._id, studentId: child._id });

            return {
                course,
                teacherName: teacher ? teacher.firstName : 'Unknown',
                evaluation: evaluation ? evaluation.evaluation : 'Not evaluated',
                note: evaluation ? evaluation.note : 'No note',
            };
        }));

        res.json({ childCourses: courseDetails });
    } catch (error) {
        console.error("Error during child courses retrieval:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

// fuction affiche les student et cours:
app.get('/courses/courseandstudents/:teacherId', async (req, res) => {

    const teacherId = req.params.teacherId;
    console.log("here is teacher id",teacherId);
    const courses = await Cours.find({ teacher: teacherId });
    console.log("here is all courses",courses);
    const studentsIds = [].concat(...courses.map(course => course.students));
    const allStudents = await User.find({ _id: { $in: studentsIds } });
    console.log(" here is all students",allStudents);
    res.json({ courses, allStudents });
  } );
// Affectation pour admin:
app.post('/courses/effectuerCours/:coursesId', async (req, res) => {
  try {
      const { coursesId } = req.params;
      console.log("here coursesId", coursesId);

      // Retrieve the course by its ID
      const cours = await Cours.findById(coursesId);
      console.log('here cours', cours);

      if (!cours) {
          return res.status(404).json({ message: 'Course not found' });
      }

      // Get student IDs to be enrolled from the request body
      const students = Array.isArray(req.body.students) ? req.body.students : [];

      // Enroll each selected student in the course if not already enrolled
      for (const studentId of students) {
          if (!studentId) {
              console.error('Student ID is undefined');
              continue; // Skip to the next iteration if student ID is undefined
          }

          const student = await User.findById(studentId);
          if (!student) {
              console.error(`Student not found with ID: ${studentId}`);
              continue; // Skip to the next iteration if student not found
          }

          // Check if the student is already enrolled in the course
          const studentExistsInCourse = cours.students.some(s => s.equals(student._id));
          if (!studentExistsInCourse) {
              // Enroll student in the course
              cours.students.push(student._id);
              await cours.save();

              // Enroll course in the student's courses list
              student.courses.push(cours._id);
              await student.save();

              // Enroll student in the teacher's students list
              const teacher = await User.findById(cours.teacher);
              if (teacher) {
                  teacher.students.push(student._id);
                  await teacher.save();
              }
          }
      }

      res.json({ message: 'Course enrollment successful' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error performing course enrollment' });
  }
});
   // Route pour ajouter une note
// app.post('/note/addNote', async (req, res) => {
//     console.log("here req.body", req.body);
//       // Créer une nouvelle note
//       const newNote = new Note(req.body);
//       // Enregistrer la note dans la base de données
//       await newNote.save();
//       res.status(200).json({ message: 'Note and evaluation added successfully' });

//   });
// Route pour ajouter une note
app.post('/note/addNote', async (req, res) => {
  try {
    console.log("here req.body", req.body);

    // Créer une nouvelle note
    const newNote = new Note(req.body);

    // Enregistrer la note dans la base de données
    await newNote.save();

    // Mettre à jour l'utilisateur avec l'ID de la nouvelle note
    const userId = req.body.studentId;
    const noteId = newNote._id;

    // Ajouter la note à la liste des notes de l'utilisateur
    await User.findByIdAndUpdate(
      userId,
      { $push: { notes: noteId } },
      { new: true }
    );

    res.status(200).json({ message: 'Note and evaluation added successfully' });
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
// Récupérer tous les étudiants d'un cours spécifique
app.get('/courses/studentsByCourse/:courseId', async (req, res) => {
  try {
      const courseId = req.params.courseId;
      console.log("here is course id", courseId);

      // Récupérer le cours spécifique avec les détails des étudiants
      const course = await Cours.findById(courseId).populate('students');
      console.log("here is the course", course);

      res.json({ course });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving course and students' });
  }
});

 
app.get('/users/teacher/:teacherId/students/:courseId', async (req, res) => {
    const teacherId = req.params.teacherId;
    const courseId = req.params.courseId;
  
    try {
      // Récupérer l'enseignant spécifique avec les détails des étudiants et des cours
      const teacher = await User.findById(teacherId).populate({
        path: 'students',
        match: { courses: courseId }  // Filtre pour les étudiants associés au cours spécifique
      });
  
      if (!teacher) {
        return res.status(404).json({ error: 'Enseignant non trouvé' });
      }
  
      // Correction : Envoyer uniquement la liste des étudiants en réponse
      res.json({ usersTab: teacher.students });
    } catch (error) {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des étudiants.' });
    }
  });
  
  
// pour pouvoir importer l'app(la rendre exportable)
module.exports = app;
