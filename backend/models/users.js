const mongoose= require ('mongoose');
const userSchema = mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    tel: Number,
    Adresse:String,
    Specialite:String,
    role: String,
    telParent:String,
    status:Boolean,
    avatar:String,
    cv:String,
    
    courses: [{ type: mongoose.Schema.Types.ObjectId,
         ref: 'Cours' }],
     students: [{ type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' }],
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
         
})
const user = mongoose.model("User", userSchema);
module.exports =user ;