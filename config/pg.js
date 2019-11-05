const { Pool, Client } = require('pg')
const env = require('../env.js');

const client = new Pool(env.pg)

client
  .connect()
  .catch(error => {
    console.log(error);
  })

module.exports = client;
