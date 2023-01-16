import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId
const CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "Instructor" ,
        required: true
    },
    createdAt: { type: Date, default: Date.now },

})

export default mongoose.model('Course' , CourseSchema)