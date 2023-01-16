import mongoose from 'mongoose'
const Schema = mongoose.Schema;

var InstructorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: String,
    role: {
        type: String,
        required: true
    },
    bio: String
});

export default mongoose.model('Instructor', InstructorSchema);