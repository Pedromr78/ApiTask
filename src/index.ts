import express, { Express, Request, Response } from "express";
import {app} from './app';
import sqlite3 from "sqlite3";


const sqlite = sqlite3.verbose();



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
