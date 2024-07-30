// functions/dbConnectionManager.js
const { MongoClient, ServerApiVersion } = require('mongodb')
require('dotenv').config()

const mongoDBUri = process.env.MONGO_DB_CONNECTION_STRING

const client = new MongoClient(mongoDBUri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsAllowInvalidHostnames: false,
})

async function connect() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect()
  }
  return client.db('nfl_games_by_year')
}

module.exports = connect
