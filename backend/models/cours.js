const mongoose= require ('mongoose');
const coursSchema = mongoose.Schema({
    nom:String,
    discription:String,
    duree:Number,
    seat:Number,
    price:Number,
    avatar:String,
   
    teacher: { type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' }, 
    students: [{ type: mongoose.Schema.Types.ObjectId, 
            ref: 'User' }],
});
const cours = mongoose.model("Cours", coursSchema);
module.exports =cours ;