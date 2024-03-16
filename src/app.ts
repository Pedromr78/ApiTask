import express, { Express, Request, Response } from "express";
import * as bodyParser from 'body-parser';
import userRouter from './routes/user.routes';
import tasksRoutes from './routes/tasks.routes';


const app: Express = express();


app.use((req:Request, res:Response, next:any) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use('/users', userRouter)
app.use('/tasks', tasksRoutes)

export {app};