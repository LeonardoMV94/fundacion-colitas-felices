import jwt from 'jsonwebtoken'
import env from '../../env.js'

export const generarTokenJwt = ({id, name, rol}) => {
    return jwt.sign({id, name, rol}, env.jwtSecret, {expiresIn: '1d'})
}

export function generarId() {
    return Math.random().toString(32).substring(2) + Date.now().toString(32)
}
