import mongoose from "mongoose";

const Schema = mongoose.Schema

const LessonSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    content: {
        type: String,
        required: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    updatedAt: Date ,
    courseId : {
        type: Schema.Types.ObjectId ,
        required: true
    }
})

export default mongoose.model('Lesson' , LessonSchema)