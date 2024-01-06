/**
 * Ruta: /api/search/:data
 */

const { Router } = require('express');

const { validarJwt } = require('../middlewares/validar-jwt');
const { getAllPosts } = require('../controllers/search.controller');

const router = Router();

router.get('/:data', validarJwt, getAllPosts);



module.exports = router;