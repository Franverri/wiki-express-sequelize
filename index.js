const express = require('express');
const bodyParser = require('body-parser');
const vb = require('volleyball');
const nunjucks = require('nunjucks');
const {db} = require('./models')
const { wiki, users, index } = require('./routes');
const app = express();

const env = nunjucks.configure('views', {noCache: true});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(vb);
app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended: false}));
app.use('/', index);
app.use('/wiki', wiki);
app.use('/users', users);
app.use(function(error, req, res, next) {
  res.render('error',
    {error, message: error.message}
    );
});
db.sync({force: false})
  .then(function() {
    app.listen(1337, function() {
      console.log('Server escuchando en 1337.')
    }); 
  });