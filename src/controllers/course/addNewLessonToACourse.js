import mongoose from "mongoose";
import Lesson from "../../schema/lesson";

export async function handler(req, res) {
     try {
          const body = req.body
          const courseId =req.params.courseId
          
          if (!body.name || !body.content )  return res.status(400).json({message: "lesson name and content are required "})

          const lesson = await Lesson.create({
               name: body.name,
               content: body.content ,
               courseId: mongoose.Types.ObjectId(courseId)
          })

          res.status(201).json(lesson)

     } catch (error) {
          res.sendStatus(500)
     }
}