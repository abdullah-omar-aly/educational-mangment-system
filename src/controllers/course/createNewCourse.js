import mongoose from "mongoose";
import Course from "../../schema/course";

export async function handler(req, res) {
     try {
          const body = req.body

          if (!body.name || !body.discription || !body.instructorId)   return res.status(400).json({message: "course name , discription and constructorId are required"})
         
          const course = await Course.create({
               name: body.name,
               discription: body.discription ,
               instructor: mongoose.Types.ObjectId(body.instructorId)
          })

          res.status(201).json(course)

     } catch (error) {
        console.log(error)
          res.sendStatus(500)
     }
}