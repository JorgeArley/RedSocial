/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, postUsuario, putUsuario } = require('../controllers/usuarios.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJwt, getUsuarios);

router.post('/',
  [
    check('user', 'user es requerido').not().isEmpty(),
    check('fullName', 'fullName es requerido').not().isEmpty(),
    check('age', 'age es requerido').not().isEmpty(),
    check('email', 'email es requerido').isEmail(),
    check('password', 'password es requerido').not().isEmpty(),
    validarCampos,
  ],
  postUsuario
);

router.put('/:id',
  [
    validarJwt,
    check('user', 'user es requerido').not().isEmpty(),
    check('fullName', 'fullName es requerido').not().isEmpty(),
    check('age', 'age es requerido').not().isEmpty(),
    check('email', 'email es requerido').isEmail(),
    validarCampos,
  ],
  putUsuario
);


module.exports = router;