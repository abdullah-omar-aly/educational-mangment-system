import express from 'express'
import verifyJWT from './middleware/verifyJWT'
import  verifyRoles  from './middleware/verifyRoles'
import { UserRoles } from './schema/user'

const apiRoutes = express.Router()

const {ADMIN ,MASTER} = UserRoles

// App API
//isnstructors
apiRoutes.post('/instructor', verifyJWT , verifyRoles(ADMIN , MASTER) ,  require("./controllers/instructor/addNewInstructor").handler)
      .patch("/instructor/:id",  verifyJWT , verifyRoles(ADMIN , MASTER) , require("./controllers/instructor/updateInstructor").handler)


      //users
      .post('/users/register' , require('./controllers/user/register').handler)
      .post('/users/login' , require("./controllers/user/login").handler)
      
      //courses
      .post("/course",  verifyJWT , verifyRoles(ADMIN , MASTER) , require("./controllers/course/createNewCourse").handler)
      .get('/courses', require('./controllers/course/listCoursesInfo').handler)
      .patch('/courses/:id',  verifyJWT , verifyRoles(ADMIN , MASTER) , require('./controllers/course/updateCourseInfo').handler)
      .post('/courses/:courseId/lessons', verifyJWT  , verifyRoles( ADMIN  , MASTER), require("./controllers/course/addNewLessonToACourse").handler)





export { apiRoutes }
