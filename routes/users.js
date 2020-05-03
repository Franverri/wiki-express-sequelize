const { Page, User } = require('../models');
const router = require('express').Router();

router.get('/', function(req, res, next){
  // Modificar para renderizar todas los usuarios que se encuentren
  // dento de la base de datos
  // Tu código acá:
  res.render('users');
});

router.get('/:id', function(req, res){
  // Modificar para renderizar los datos del usuario seleccionado
  // Tu código acá:
  res.render('unUsuarioEnParticular');
});

module.exports = router;
