const router = require('express').Router();
const { Page, User } = require('../models');

router.get('/', function(req, res) {
  res.redirect('/');
});

router.post('/', function(req, res, next) {
  // Modificar para que cuando se clickee el botón de "SUBMIT" se cree un nuevo post
  // tomando los datos desde el form y agregándolo a la base de datos
  // Tu código acá:
  res.render('index');
});

router.get('/add', function(req, res) {
  res.render('addpage');
});

router.get('/:urlTitle', function(req, res) {
  // Modificar para que cuando se seleccione un "Page" en particular se muestren
  // los datos asociados al mismo
  // Tu código acá:

  res.render('wikipage');
});

module.exports = router;
