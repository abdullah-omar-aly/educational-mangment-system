import express from  'express';
import  path  from 'path';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())


app.use(express.static(path.join(__dirname, 'public')));

app.use('/api' , require("./routes").apiRoutes)


export {app}