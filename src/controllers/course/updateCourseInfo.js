import Course from "../../schema/course"

export async function handler(req, res) {
     try {
        const courseId = req.params.id
        
        const course = await Course.findById(courseId)

        for (let key in req.body) {
          course[key] = req.body[key]
        }

        await course.save()

        res.status(200).json(course)

     } catch (error) {
          console.log(error)
          res.sendStatus(500)
     }
}