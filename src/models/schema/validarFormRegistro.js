import { body } from "express-validator";

const validarFormRegistro = [
    body('name').isString().withMessage('nombre debe ser un string').isLength({min: 3}).withMessage('nombre debe tener minimo 3 caracteres'),
    body('email').isString().isEmail().withMessage('email debe ser valido').trim(),
    body('password').isString().withMessage('password debe ser string').isLength({min: 6, max: 255}).withMessage('password debe ser minimo 6 y maximo 255').trim(),
    body('password2').isString().withMessage('password2 debe ser string').isLength({min: 6, max: 255}).withMessage('password2 debe ser minimo 6 y maximo 255').trim().custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    })
  ]

  export default validarFormRegistro