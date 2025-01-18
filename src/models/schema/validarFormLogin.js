import { body } from "express-validator";

const validarFormLogin = [
    body('email').isString().isEmail().withMessage('debe ser un email valido').trim(),
    body('password').isString().withMessage('debe ser string').isLength({min: 6, max: 255}).withMessage('password debe ser de minimo 6 maximo 255').trim()
  ]

  export default validarFormLogin