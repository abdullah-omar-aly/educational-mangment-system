import Instructor from "../../schema/instructor";

export async function handler(req, res) {
     try {
        const instructorId = req.params.id

        const instructor = await Instructor.findById(instructorId)
        
          // any property is not in the schema will be ignored by mongoose
        for (let key in req.body) {
            instructor[key] = req.body[key]
        }

        await instructor.save()

        res.status(200).json(instructor)

     } catch (error) {
          res.sendStatus(500)
     }
}