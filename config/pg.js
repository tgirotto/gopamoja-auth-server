const { Pool, Client } = require('pg')
const env = require('../env.js');

const client = new Pool(env.pg)

client
  .connect()
  .then(client => {
    console.log(`Connected to ${env.pg.database} DB!`);
  })
  .catch(error => {
    console.log(error);
  })

module.exports = client;
