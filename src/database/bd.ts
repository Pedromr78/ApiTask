import sqlite3 from "sqlite3";


const sqlite = sqlite3.verbose();

export module bd{

export function bdconexion(){
  const db:any = new sqlite.Database('chinook.db', sqlite.OPEN_READWRITE|sqlite.OPEN_CREATE, (err) => {
    if (err) {
      return false;
    }
   else{
    return db;
   }
})
}

function bdinit(){
  const db = new sqlite.Database('chinook.db', sqlite.OPEN_READWRITE|sqlite.OPEN_CREATE, (err) => {
    if (err) {
      return false;
    }
   else{
    console.log("Database created")
    const sqltable= "CREATE TABLE IF NOT EXISTS users(ID INTEGER PRIMARY KEY, name, surname, password, email)";
  db.run(sqltable);
  return true;
   }
  });
  
}
}