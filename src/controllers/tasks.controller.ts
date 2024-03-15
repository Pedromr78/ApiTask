import { Request, Response, NextFunction } from "express";
import validator from 'validator';
import sqlite3 from "sqlite3";


export class TasksController {

    sqlite = sqlite3.verbose();

    newtask(req: Request, res: Response, next: NextFunction) {
        var params = req.body;
        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        var validate_user = !validator.isEmpty(params.userID);
        var validate_name = !validator.isEmpty(params.name);
        var validate_date = !validator.isEmpty(params.date) && !validator.isDate(params.date);
        var validate_description = !validator.isEmpty(params.description);
        if (validate_name && validate_description && validate_date && validate_user && validate_email) {
            const db = new this.sqlite.Database('./chinook.db', this.sqlite.OPEN_READWRITE, (err) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error de conexion con bd',
                    })
                }
                else {

                    db.get("SELECT * FROM users WHERE email = ?", params.email, (err, row: any) => {
                        if (err) {
                            return res.status(404).send({
                                status: 'error',
                                message: 'Error en query',
                            })
                        } else {
                            if (row && row.email == params.email && row.id == params.id) {
                                var user = row;
                                db.run('INSERT INTO tasks(name, date, description, status, userID) VALUES(?, ?, ?, ?, ?)', [params.name, params.date, params.description, params.status, params.userID], (err) => {
                                    if (err) {
                                        return res.status(404).send({
                                            status: 'error',
                                            message: 'Task no añadida',
                                        })
                                    } else {
                                        return res.status(200).send({
                                            status: 'success',
                                            task: params,
                                         
                                        });
                                    }
                                })

                            }
                            else {
                                return res.status(500).send({
                                    message: 'No tiene acceso',
                                    status: 'error'
                                })
                            }

                        }
                    })

                }
            })

        } else {
            return res.status(404).send({
                status: 'error',
                message: 'Datos de la tarea incorrectos',
            })
        }
    }
    getTask(req: Request, res: Response, next: NextFunction) {
        var params = req.body;
        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        if (validate_email) {
            const db = new this.sqlite.Database('./chinook.db', this.sqlite.OPEN_READWRITE, (err) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error de conexion con bd',
                    })
                }
                else {

                    db.get("SELECT * FROM users WHERE email = ?", params.email, (err, row: any) => {
                        if (err) {
                            return res.status(404).send({
                                status: 'error',
                                message: 'Error en query',
                            })
                        } else {
                           
                            if (row && row.email == params.email && row.ID == params.userID) {
                                db.get("SELECT * FROM tasks WHERE id = ?", params.id, (err, row: any) => {
                                    if (row) {
                                        return res.status(200).send({
                                            status: 'success',
                                            task: row,
                                        
                                        });
                                    }else  {
                                        return res.status(404).send({
                                            status: 'error',
                                            message: 'Esta tarea no existe',
                                        })
                                    }
                                })
                            } else{
                                return res.status(404).send({
                                    status: 'error',
                                    message: 'No tienes acceso',
                                })
                            }

                        }
                    })
                }
            })
        } else {
            return res.status(404).send({
                status: 'error',
                message: 'Datos incorrectos',
            })
        }
    }
    deleteTask(req: Request, res: Response, next: NextFunction) {
        var params = req.body;
        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        if (validate_email) {
            const db = new this.sqlite.Database('./chinook.db', this.sqlite.OPEN_READWRITE, (err) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error de conexion con bd',
                    })
                }
                else { db.get("SELECT * FROM users WHERE email = ?", params.email, (err, row: any) => {
                    if (err) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'Error en query',
                        })
                    } else {
                        if (row && row.email == params.email && row.ID == params.userID) {
                            db.run("DELETE FROM tasks WHERE ID = ?", params.id, (err:any, row: any) => {
                                if (err) {
                                    return res.status(404).send({
                                        status: 'error',
                                        message: err,
                                    })
                                }else{
                                    return res.status(200).send({
                                        status: 'success',
                                        tasks: 'Tarea eliminada',
                                       
                                    });
                                }

                                                        })
                        }else{
                                return res.status(404).send({
                                    status: 'error',
                                    message: 'No tienes acceso',
                                })
                            }
                    }
                })

                }
            })
        }else {
            return res.status(404).send({
                status: 'error',
                message: 'Datos incorrectos',
            })
        }
    }
    updateTask(req: Request, res: Response, next: NextFunction){

        var params = req.body;
        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        if (validate_email) {
            const db = new this.sqlite.Database('./chinook.db', this.sqlite.OPEN_READWRITE, (err) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error de conexion con bd',
                    })
                }
                else {
                    db.get("SELECT * FROM users WHERE email = ?", params.email, (err, row: any) => {
                        if (err) {
                            return res.status(404).send({
                                status: 'error',
                                message: 'Error en query',
                            })
                        } else {
                            if (row && row.email == params.email && row.ID == params.userID) {

                                db.get("SELECT * FROM tasks WHERE id = ?", params.id, (err, row: any) => {
                                    if (row) {
                                            var oldtask= row;
                                        db.run("UPDATE tasks SET name = ?, date = ?, description = ?, status = ? WHERE ID = ?", [params.name, params.date, params.description, params.status, oldtask.ID], (err:any, data:any) => {
                                         
                                            if (err) {
                                                return res.status(404).send({
                                                    status: 'error',
                                                    message: err,
                                                })
                                            }else{
                                                return res.status(200).send({
                                                    status: 'success',
                                                    oldtasks: oldtask,
                                                  
                                                   
                                                });
                                            }
                                        })
                                    }else  {
                                        return res.status(404).send({
                                            status: 'error',
                                            message: 'La tarea que quiere actualizar no existe',
                                        })
                                    }
                                })
                            }else{
                                return res.status(404).send({
                                    status: 'error',
                                    message: 'No tienes acceso',
                                })
                            }

                        }
                    })

                }
            })
        
        
        }


    }

    getTasks(req: Request, res: Response, next: NextFunction) {
        var params = req.body;
        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        if (validate_email) {
            const db = new this.sqlite.Database('./chinook.db', this.sqlite.OPEN_READWRITE, (err) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error de conexion con bd',
                    })
                }
                else {

                    db.get("SELECT * FROM users WHERE email = ?", params.email, (err, row: any) => {
                        if (err) {
                            return res.status(404).send({
                                status: 'error',
                                message: 'Error en query',
                            })
                        } else {
                            if (row && row.email == params.email && row.ID == params.id) {
                                var user = row;
                                db.all("SELECT * FROM tasks WHERE userID = ?", params.userID, (err, row: any) => {
                                    if (row) {
                                        return res.status(200).send({
                                            status: 'success',
                                            tasks: row,
                                       
                                        });
                                    } else {
                                        return res.status(200).send({
                                            status: 'success',
                                            tasks: 'Este usuario no contiene ninguna tarea',
                                           
                                        });
                                    }
                                })
                            } else{
                                return res.status(404).send({
                                    status: 'error',
                                    message: 'No tienes acceso',
                                })
                            }
                        }
                    })
                }
            })
        } else {
            return res.status(404).send({
                status: 'error',
                message: 'Datos incorrectos',
            })
        }
    }

}