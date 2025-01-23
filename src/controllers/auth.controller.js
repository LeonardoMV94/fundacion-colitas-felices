import User from "../models/user.model.js";
import { Op } from "sequelize";
import {generarTokenJwt} from "../config/token.js";
import verificarPassword from "../models/schema/validacionPassword.js";
import bcrypt from 'bcrypt'
import {validationResult} from 'express-validator'

const loginRenderController = (req, res) => {
  res.render("auth/login", {
    layout: "sin-partials",
    titulo: "Inicio Sesion | Colitas felices",
  });
};

const loginFormulario = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("EMAIL PASSWORD: ", email, password);

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.render('auth/login',{
            titulo: 'Inicio sesion | Colitas felices',
            errores: result.array()
        })
    }

    // buscar en bd
    const usuario = await User.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.render("auth/login", {
        layout: "sin-partials",
        errores: [{msg: `email ${email} no existe`}]
      });
    }
    console.log(usuario);
    if (!verificarPassword(password, usuario.password)) {
      return res.render("auth/login", {
        layout: "sin-partials",
        errores: [{msg: `contraseña incorrecta`}]
      });
    }

    const token = generarTokenJwt({
      id: usuario.id,
      name: usuario.name,
      rol: usuario.rol,
    });

    res.cookie("_token", token, {
      httpOnly: true,
      // secure: true,
      // sameSite: true
    });
    res.cookie("nombre", usuario.name, {
        httpOnly: true,
        // secure: true,
        // sameSite: true
      });
    res.redirect("/");

  } catch (error) {
    console.log(error);
    return res.render("auth/login", {
      layout: "sin-partials",
      errores: [{msg:`error en el servidor`}]
    });
  }
};

const registroRenderController = (req, res) => {
    res.render("auth/registro", {
        layout: "sin-partials",
        titulo: "Registro Usuario | Colitas felices",
      });
}

const registroFormularioController = async(req, res) => {
    const {name, email, password, password2 } = req.body
    console.log("registro de usuario: ", JSON.stringify({name, email, password, password2 }))

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.render('auth/registro',{
            titulo: 'Registro | Colitas felices',
            errores: result.array()
        })
    }

    // crear un usuario
    try {

        const user = await User.findOne({
            where: {
                email
            }
        })
        if(user){
            return res.render("auth/registro", {
                layout: "sin-partials",
                errores: [{msg: `intente con otro correo`}],
              });
        }

        const passwordHashed = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name,
            email,
            password: passwordHashed
        })

        if(!newUser){
            return res.render("auth/registro", {
                layout: "sin-partials",
                errores: [{msg:`no se pudo crear`}]
              });
        }

        res.redirect('/auth/login')


    } catch (error) {
        return res.render("auth/registro", {
            layout: "sin-partials",
            errores: [{msg:`error en el servidor`}]
          });
    }

}

const cerrarSesion = (req, res) => {
    res.clearCookie('_token')
    res.clearCookie('nombre')
    res.redirect('/auth/login')
}

export { loginRenderController, loginFormulario, registroRenderController , registroFormularioController, cerrarSesion};
