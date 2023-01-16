import Course from "../../schema/course";

export async function handler(req, res) {
     try {

          const courses = await Course.find().populate("instructor")

          res.status(200).json(courses)

     } catch (error) {
          res.sendStatus(500)
     }
}