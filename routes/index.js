const router = require('express').Router();
const { Page } = require('../models');

router.get('/', function(req, res){
  // Modificar para renderizar todas las páginas creadas que se encuentren
  // dento de la base de datos
  // Tu código acá:
  res.render('index');
})

module.exports = {
  users: require('./users'),
  wiki: require('./wiki'),
  index: router,
};
