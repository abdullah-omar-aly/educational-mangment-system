
# Educational managment system api 




## Tech Stack

**Main:** Nodejs  , maongodb

**Packages:** Express.js ,mongoose , bcrypt ,  Jsonwebtoken , validator , mongodb-memory-server , Jest , supertest , babel

## Features

- Users can sign up a new account or  login to an existing account
- User can list the courses
- admin can add instructors to the plateform
- admin can create , update a new course and relate the course to a specific instructor
- admin can add lessons to every course



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_DB_URI`
`HASHING_PEPPER`
`JWT_SECRET`


## Run Locally

Clone the project

```bash
  git clone https://github.com/abdullah-omar-aly/educational-mangment-system.git
```

Go to the project directory

```bash
  cd educational-mangment-system
```

Install dependencies

```bash
  npm install
```
Build and start the server

```bash
  npm run build && npm run start
```

Or start the app in the development mode directly

```bash
  npm run dev
```


## Database schema

|  **User**   `email`  `password`  `firstName`  `lastName`  `roles[]`  `passwordSalt`

| **Instructor**  `name`  `image` `role`  `bio`

|  **Course** `name` `description` `instructorId`

|  **lesson** `name`  `content` `createdAt` `updatedAt`  `courseId`

## API Reference








| Route         | Method                        | body                                      | URL Params        | Restrictions |
| :--------     | :---------------------------- | :---------------------------------------- | :----------       | :-------------|
| `POST`        | `/api/user/register`          | `email` `password` `firstName` `lastName` |
| `POST`        | `/api/user/login `            | `email` `password`                        |
| `GET`         | `/api/courses `               |                                           |
| `POST`        | `/api/courses `               | `name` `discription` `instructorId`       |                   | jwt required (admin role)
| `PATCH`       | `/api/courses/:courseId`      | `name` `discription` `instructorId`       | `instructorId`    | jwt required (admin role)
| `POST`        | `/courses/:courseId/lessons`  | `name` `content`                          | `courseId`        | jwt required (admin role)
| `POST`        | `/instructor`                 | `name` `role`                             |                   | jwt required (admin role) 
| `PATCH`       | `/instructor/:instructorId`   | `name` `role`                             | `instructorId`    | jwt required (admin role)


