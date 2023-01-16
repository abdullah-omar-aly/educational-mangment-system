import User from "../../schema/user";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function handler(req, res) {
     try {
          const body = req.body

          if (!body.email || !body.password) {
               return res.status(400).json({ message: "Both email and password are required" })
          }

          const user = await User.findOne({ email: body.email })
          if (!user) return res.sendStatus(401)    //unauthorized (email is't registerd yet)

          const { id , firstName, password: passwordHash, email, lastName, passwordSalt , roles} = user
          const pepper = process.env.HASHING_PEPPER

          const isCorrect = await bcrypt.compare(passwordSalt + body.password + pepper, passwordHash)
          if (isCorrect) {
               jwt.sign({
                    id,
                    email,
                    firstName,
                    lastName , 
                    roles
               },
                    process.env.JWT_SECRET,
                    {
                         expiresIn: '2d'
                    }, (err, token) => {
                         // callback which is called when the token is ready
                         if (err) {
                              return res.sendStatus(500)
                         }
                         res.cookie('jwt' , token , {
                              maxAge: 1000 * 60 * 60 * 24,
                              // secure: true,
                              httpOnly: true
                         })
                         return res.sendStatus(200)
                    }
               )
          } else {
               // unauthorized (password isn't correct)
               return res.status(401).json({message: "incorrect password"})
          }


     } catch (error) {
          console.log(error)
          res.sendStatus(500)
     }
}