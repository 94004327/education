const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cours' },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  note: Number,
  evaluation: String,
  
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
