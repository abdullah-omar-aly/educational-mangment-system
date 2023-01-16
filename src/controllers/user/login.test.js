import User from "../../schema/user"
import request from 'supertest'
import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"
import {app} from '../../app' 

describe('POST /api/users/login (login an existing user)', () => {

    beforeAll(async () => {
        const mongoServer = await MongoMemoryServer.create()
        await mongoose.connect(mongoServer.getUri())
    })
    afterAll(async () => {
        await mongoose.disconnect()
        await mongoose.connection.close()
    })


    describe('missing email or password', () => {
        test('should respond with status code 400', async () => {
            const bodyData = [
                {email: "email@gmail.com"} ,
                {password: "User1234!" } 
            ]  
                

            for (const body of bodyData) {
                //setup test
                await User.deleteMany()
                //start test
                const response = await request(app).post('/api/users/login').send(body)
                expect(response.statusCode).toBe(400)
                expect(response.body).toEqual({message: "Both email and password are required"})
                //end test
                await User.deleteMany()

            }

        })
    })  

    describe("Email is't registered yet (not authorized)" , () => {
        test('should respond with status code 401' , async () => {
            await User.deleteMany()

            await request(app).post('/api/users/login').send({
                email: "user@gmail.com",
                password: "Person2!"
            }).expect(401)

            await User.deleteMany()
        })
    })

    describe("successful login" , () => {
        test('should respond with status cod 200 and token in the json body' , async () => {
            // setup test
            await User.deleteMany()
            await request(app).post('/api/users/register').send({
                email: "user@gmail.com",
                password: "Person2!",
                firstName: "Abdullah",
                lastName: "Omar"
            })

            await request(app).post('/api/users/login').send({
                email: "user@gmail.com",
                password: "Person2!"
            }).expect(200)
        
            await User.deleteMany()
        })
    }) 
   

    
    describe("login failed (incorrect password)" , () => {
        test('should respond with status cod 200 and token in the json body' , async () => {
            // setup test
            await User.deleteMany()
            await request(app).post('/api/users/register').send({
                email: "user@gmail.com",
                password: "Person2!",
                firstName: "Abdullah",
                lastName: "Omar"
            })

            const response = await request(app).post('/api/users/login').send({
                email: "user@gmail.com",
                password: "Person11!"
            })
            expect(response.statusCode).toBe(401)
            expect(response.body).toEqual({message: "incorrect password"})
        
            await User.deleteMany()
        })
    }) 
   


})     