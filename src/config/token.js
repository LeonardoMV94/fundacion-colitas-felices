import jwt from 'jsonwebtoken'
import env from '../../env.js'

const generarTokenJwt = ({id, name, rol}) => {
    return jwt.sign({id, name, rol}, env.jwtSecret, {expiresIn: '1d'})
}

export default generarTokenJwt