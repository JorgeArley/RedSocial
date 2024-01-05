/**
 * Ruta: /api/login
 */

const { Router } = require('express');
const { login } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',
  [
    check('email', 'email es requerido').isEmail(),
    check('password', 'password es requerido').not().isEmpty(),
    validarCampos
  ],
  login
);


module.exports = router;