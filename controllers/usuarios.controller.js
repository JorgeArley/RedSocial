const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const { generarJwt } = require('../helpers/jwt');


const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find();
  res.json({
    ok: true,
    usuarios
  });
}

const getUsuarioById = async (req, res = response) => {

  const uid = req.params.id;

  try {
    const user = await Usuario.findById(uid)
        .populate('posts', {});

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe ese usuario'
      });
    }

    res.json({
      ok: true,
      user: user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el get por id de usuario'
    });
  }
}

const postUsuario = async (req, res) => {
  const {email, password} = req.body;
  
  try {
    const existEmail = await Usuario.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya esta registrado'
      })
    }
    const usuario = new Usuario(req.body);
    //encriptar contraseña

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // generar token
    const token = await generarJwt(usuario.id);

    res.json({
      ok: true,
      usuario,
      token
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el post para crear usuario'
    });
  }
}

const putUsuario = async (req, res = response) => {

  const uid = req.params.id;


  try {
    //validar token 

    const usuarioDB = await Usuario.findById(uid);

    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: 'No existe ese usuario'
      });
    }

    //actualizaciones

    const { password, email, ...campos } = req.body;
    if (usuarioDB.email !== email) {
      const existEmail = await Usuario.findOne({ email });
      if (existEmail) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya existe un usuario con ese email'
        });
      }
    }

    campos.email = email;
    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

    
    res.json({
      ok: true,
      usuarioActualizado
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error inesperado..en el put'
    });
  }
}


module.exports = {
  getUsuarios,
  postUsuario,
  putUsuario,
  getUsuarioById
}
