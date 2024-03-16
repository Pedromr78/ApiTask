'use strict'
import jwt from 'jwt-simple'
import moment from 'moment'
import { Express, Request, Response, NextFunction } from 'express';
var secret='clave-secreta-para-generar-el-tocken-99999';


export function authenticated(req:Request, res:Response, next:NextFunction) {
        if(!req.headers.authorization){
            return res.status(403).send({
                message: 'La peticion no tiene la cabecera'
            })
        }
        //Limpiar el tocken de comillas
        var tocken = req.headers.authorization.replace(/['"]+/g,'');
        try{
            //decodificar tocken
            var payload=jwt.decode(tocken, secret);
            //Comprobar si el tocken he expirado    
            if(payload.ex <= moment().unix()){
                return res.status(404).send({
                    message: 'El tocken ha expirado'
                })
            }
        }catch(ex){
            return res.status(404).send({
                message: 'El tocken no es valido'
            })
        }
        //Adjuntar usuario identificado a request
        req.body.user=payload;
        //Pasar la accion
        next();
}