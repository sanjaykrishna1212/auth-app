
////////////////////////////////////////////////////////////////////////////////////////////
// Purpose: Helps to add mock username and password in DB and perform crud operation
//
// Author: Sanjay
////////////////////////////////////////////////////////////////////////////////////////////
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();


const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);


let db;


async function connect() {
if (!db) {
await client.connect();
db = client.db(process.env.MONGO_DB_NAME || 'spa_app');
console.log('Connected to MongoDB');
}
return db;
}


module.exports = { connect, client };