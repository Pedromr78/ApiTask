'use strict'

import jwt from 'jwt-simple'
import moment from 'moment'
export class jwtService{
 creaateTocken(user:any){
    var payload={
        sub: user.id,
        name: user.name,
        surname: user.surname,
        email:user.email,
        role:user.role,
        image:user.image,
        iat:moment().unix(),
        exp:moment().add(30,'days').unix



    }

    return jwt.encode(payload, 'clave-secreta-para-generar-el-tocken-99999');

}
}