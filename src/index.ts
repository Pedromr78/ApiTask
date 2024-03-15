import express, { Express, Request, Response } from "express";
import * as bodyParser from 'body-parser';
import userRouter from './routes/user.routes';
import tasksRoutes from './routes/tasks.routes';
// import cors from 'cors';
import dotenv from "dotenv";
import sqlite3 from "sqlite3";


const sqlite = sqlite3.verbose();


dotenv.config();


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


const port = process.env.PORT || 3000;

const db = new sqlite.Database('chinook.db', sqlite.OPEN_READWRITE|sqlite.OPEN_CREATE, (err) => {
    if (err) {
     console.log(err);
    }
   else{
    console.log("Database created")
    const sqltableuser= "CREATE TABLE IF NOT EXISTS users(ID INTEGER PRIMARY KEY, name, surname, password, email)";
    const sqltabletasks= "CREATE TABLE IF NOT EXISTS tasks(ID INTEGER PRIMARY KEY, name, date DATE, description ,status NULL, userID , FOREIGN KEY(userID) REFERENCES users(ID))";
    db.run(sqltableuser);
    db.run(sqltabletasks);
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);

        });
    
    }

})
