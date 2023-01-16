import User from "../../schema/user"
import request from 'supertest'
import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"
import {app} from '../../app' 

describe('POST /api/users/register (register a new user)', () => {

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
                {email: "email@gmail.com" , firstName: "Abdullah" , lastName:"Omar"} ,
                {password: "User1234!" , firstName: "Abdullah" , lastName:"Omar"} ,
                {password: "User1234!" , email: "email@gmail.com" , lastName:"Omar"} ,
                {password: "User1234!" , email: "email@gmail.com" , firstName:"Omar"} ,

            ]  
                

            for (const body of bodyData) {
                await User.deleteMany()
                const response = await request(app).post('/api/users/register').send(body)
                expect(response.statusCode).toBe(400)
                expect(response.body).toEqual({message: "email , firstName , lastName and password are required"})
                await User.deleteMany()

            }

        })
    })  


    describe('Email or password is not valid', () => { 
        test('should respond with status code 400', async () => {
            await User.deleteMany()
            const bodyData = [
                { email: "user@gmail",  password: "Hello324223!", firstName: "Abdullah",  lastName: "Omar" }  ,
                { email: "user@gmail.com",  password: "Hello3!", firstName: "Abdullah",  lastName: "Omar" }  ,
                { email: "user@gmail.com",  password: "Hello324223", firstName: "Abdullah",  lastName: "Omar" }  ,
                { email: "usergmail.com",  password: "Hello324223!", firstName: "Abdullah",  lastName: "Omar" }  ,
                { email: "@gmail.com",  password: "Hello324223!", firstName: "Abdullah",  lastName: "Omar" }  
            ]  
            for (const body of bodyData) {
                await User.deleteMany()
                const response = await request(app).post('/api/users/register').send(body)
                expect(response.statusCode).toBe(400)
                expect(response.body).toEqual({message: 'email or password is not valid'})
                await User.deleteMany()
            }

        })
     })

    describe("email already exist (duplicated)", () => {
        test('should respond with status code 409', async () => {
            // setup test
            await User.deleteMany()
            await User.create({
                email: "user@gmail.com",
                password: "person1!!",
                firstName: "Abdullah",
                lastName: "Omar"
            })
            // start test
            await request(app).post('/api/users/register').send({
                email: "user@gmail.com",
                password: "Person2!",
                firstName: "Abdullah",
                lastName: "Omar"
            }).expect(409)
            //end test
            await User.deleteMany()
        })
    })

    describe("successful registration", () => {
        test('should respond with status code 201', async () => {
            // setup test
            await User.deleteMany()

            // start test
            await request(app).post('/api/users/register').send({
                email: "user@gmail.com",
                password: "Person2!",
                firstName: "Abdullah",
                lastName: "Omar"
            }).expect(201)
            //end test
            await User.deleteMany()
        })
    })
})    