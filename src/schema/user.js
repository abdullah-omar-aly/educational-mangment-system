import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const UserRoles = {
    MASTER: 'master' , 
    ADMIN: 'admin' , 
    BASIC: 'basic'
}


const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String , 
        required: true
    } , 
    lastName: {
        type: String , 
        required: true
    },
    roles: {
        type: [String] ,
        default: [UserRoles.BASIC]
    },
    passwordSalt: String

})

export default mongoose.model('User' , UserSchema) 