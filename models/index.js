var Sequelize = require('sequelize');
const S = Sequelize;
var db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const Page = db.define('page', {
  // Tu código acá:

});

const User = db.define('users', {
  // Tu código acá:

})

// Vincular User con Page
// Tu código acá:


module.exports = {
  User,
  Page,
  db
}
