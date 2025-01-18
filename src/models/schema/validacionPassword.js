import bcrypt from 'bcrypt'

const verificarPassword = (password,  passwordDB) => {
    return bcrypt.compareSync(password, passwordDB);
}

export default verificarPassword