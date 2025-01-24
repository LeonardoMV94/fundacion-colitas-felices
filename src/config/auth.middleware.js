import jwt from 'jsonwebtoken';
import env from '../../env.js';
import User from '../models/user.model.js';

const isHaveToken = async(req, res, next) => {
  try {
    const token = req.cookies._token;
    console.log('token de cookie: ', token);
    if (!token) {
      return res.redirect('/auth/login');
    }    

    const { id } = jwt.verify(token, env.jwtSecret);

    const usuario = await User.findByPk(id);
    if( !usuario ) {
      return res.redirect('/auth/login');
    }
    
    next();
  } catch (error) {
    console.log(error);
    return res.redirect('/auth/login');
  }
};

const isAdminRol = (req, res, next) => {
  try {
    const token = req.cookies._token;
    console.log('token de cookie: ', token);
    if (!token) {
      return res.redirect('/auth/login');
    }

    const { rol } = jwt.verify(token, env.jwtSecret);
    console.log('rol: ', rol);

    if(rol !== 'administrador') {
      return res.render('auth/noEresAdmin', {
        layout: 'sin-partials'
      });
    }
    
    next();
  } catch (error) {
    console.log(error);
    return res.render('auth/login', {
      layout: 'sin-partials',
      errores: [{ msg: `error en el servidor` }]
    });
  }
};

export { isHaveToken, isAdminRol };
