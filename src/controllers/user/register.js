import User from "../../schema/user";
import bcrypt from "bcrypt"
import validator from 'validator';
import jwt from "jsonwebtoken"

import { v4 as uuidv4 } from 'uuid';

export async function handler(req, res) {
     try {
          const body = req.body 

          if (!body.email || !body.password || !body.firstName || !body.lastName) {
               return res.status(400).json({message: "email , firstName , lastName and password are required"})
          }
      
          if ( !validator.isStrongPassword(body.password ) || !validator.isEmail(body.email)){
               return res.status(400).json({message: 'email or password is not valid'})
          } 

          const userExist = await User.findOne({ email: body.email });
          if (userExist) {
              return res.sendStatus(409)
          }

          const salt = uuidv4() 
          const pepper = process.env.HASHING_PEPPER
          const passwordHash = await bcrypt.hash(salt + body.password + pepper, 10)
  


          const registeredUser = await User.create({
                firstName: body.firstName , 
                lastName: body.lastName , 
                email: body.email , 
                password: passwordHash , 
                passwordSalt: salt
          })

          res.sendStatus(201)
      } catch (error) {
        console.log(error)
          res.sendStatus(500)
     }
}