/**
 * Ruta: /api/posts
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-jwt');
const { getPosts, createPost, putPost, getPostById } = require('../controllers/posts.controller');


const router = Router();

router.get('/', validarJwt, getPosts);

router.get('/:id', validarJwt, getPostById);

router.post('/',
  [
    validarJwt,
    check('title', 'title es requerido').not().isEmpty(),
    check('content', 'content es requerido').not().isEmpty(),
    check('likes', 'likes es requerido').not().isEmpty(),
    validarCampos,
  ],
  createPost
);

router.put('/:id',
  [
    validarJwt,
    check('title', 'title es requerido').not().isEmpty(),
    check('content', 'content es requerido').not().isEmpty(),
    check('likes', 'likes es requerido').not().isEmpty(),
    check('userId', 'userId debe ser valido').isMongoId(),
    validarCampos,
  ],
  putPost
);


module.exports = router;