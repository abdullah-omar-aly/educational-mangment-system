import Instructor from "../../schema/instructor";

export async function handler(req, res) {
     try {
          const body = req.body
          if (!body.name || !body.role) return res.status(400).json({ message: "Instructor name and role are required" })

          const result = await Instructor.create({
               name: req.body.name,
               role: req.body.role
          })

          res.status(201).json(result)
     } catch (error) {
          res.sendStatus(500)
     }
}