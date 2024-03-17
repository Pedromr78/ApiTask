import validator from "validator";
import bcrypt from 'bcrypt-nodejs';
import sqlite3  from "sqlite3";
import {jwtService} from '../services/jwt'
import { Router, Request, Response, NextFunction  } from 'express';



export class UserController{

     sqlite = sqlite3.verbose();
    jwt = new jwtService();

    constructor(){

    }

     save(req: Request, res: Response, next: NextFunction){
        var params = req.body;
        var validate_name = !validator.isEmpty(params.name);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        var validate_password = !validator.isEmpty(params.password);
        if (validate_name && validate_surname && validate_email && validate_password) {
         
            const db = new this.sqlite.Database('./apitask.db', this.sqlite.OPEN_READWRITE, (err) => {
                if (err) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'Error de conexion con bd',
                    })
                  }
                 else{
                    let sql = "SELECT * FROM users WHERE email = ?";
                    db.get(sql, params.email, (err, row) => {
                        if (err) {
                            return res.status(404).send({
                                status: 'error',
                                message: 'Error en query',
                            })
                          }else{
                            if(row){
                                return res.status(404).send({
                                     status: 'error',
                                    message: 'Este usuario ya existe',
                                })
                            }
                            else{
                                bcrypt.hash(params.password, '', null, (err, hash) => {
                                    
                                params.password=hash;


                                db.run('INSERT INTO users(name, surname, email, password) VALUES(?, ?, ?, ?)', [params.name,params.surname,params.email,params.password], (err) => {
                                    if(err) {
                                        return res.status(404).send({
                                            status: 'error',
                                            message: 'Usuario no añadido',
                                        })
                                    }else{
                                        return res.status(200).send({
                                            status: 'success',
                                            user: params
                                        });
                                    }
                                })
                                
                                })
                             

                            }
                          }

                    });
                 }
                });



        }else {
            return res.status(404).send({
                status: 'error',
                message: 'No se ha registrado correctamente, vuelva a intentarlo',
            })
        }
    }

    login(req: Request, res: Response, next: NextFunction){
        var params = req.body;

        var validate_email = validator.isEmail(params.email) && !validator.isEmpty(params.email);
        var validate_password = !validator.isEmpty(params.password);
        if (!validate_password && !validate_email) {
            
            return res.status(404).send({
                status: 'error',
                message: 'No se ha validado correctamente, vuelva a intentarlo',
            })
        }
        const db = new sqlite3.Database('./apitask.db', sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Error de conexion con bd',
                })
              }
          
                let sql = "SELECT * FROM users WHERE email = ?";
                db.get(sql, params.email, (err, user:any) => {
                    if (err) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'Error en query',
                        })
                      }
                      if(!user){
                        return res.status(404).send({
                            status: 'error',
                            message: 'Este usuario no existe',
                        })
                    }

                    let sql = "SELECT password FROM users WHERE email = ?";
                    db.get(sql, params.email, (err, row:any) => {
                        if (err) {
                            return res.status(404).send({
                                status: 'error',
                                message: 'Error al extraer datos',
                            })
                          }
                          if(row){
                            
                            bcrypt.compare(params.password, row.password, (err, check) => {
                            if(check){
                                if (params.gettoken) {
                                    return res.status(200).send({
                                        status: 'success',
                                        tocken: this.jwt.creaateTocken(user)
                                    })
                                } else {
            
                                    user.password = undefined;
                                    return res.status(200).send({
                                        status: 'success',
                                        user
                                    })
                                }
                            }
                            else {
                                return res.status(404).send({
                                    status: 'error',
                                    message: 'Credenciales incorrectas'
                                })
                            }
                            
                            
                            })



                          }
                    
                    })
                
                })

             

        })
    
    }
}