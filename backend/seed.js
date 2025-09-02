////////////////////////////////////////////////////////////////////////////////////////////
// Purpose: Helps to add mock username and password in DB and perform crud operation
//
// Author: Sanjay
////////////////////////////////////////////////////////////////////////////////////////////

const { connect } = require('./db');
const bcrypt = require('bcrypt');


//#region creating DB
/**
 * helps to create db using IIFE function
 */
(async () => {
try {

const db = await connect();
const users = db.collection('users');
const records = db.collection('records');

await users.deleteMany({});
await records.deleteMany({});

const adminPass = await bcrypt.hash('admin123', 10);
const userPass = await bcrypt.hash('user123', 10);

await users.insertMany([
{ userId: 'admin', name: 'Administrator', passwordHash: adminPass, role: 'Admin' },
{ userId: 'user', name: 'User', passwordHash: userPass, role: 'User' },
{ userId: 'sanjay', name: 'Sanjay', passwordHash: userPass, role: 'User' }
]);

await records.insertMany([
{ owner: 'Mark', title: 'Mark', value: 10 },
{ owner: 'Elon', title: 'Elon', value: 20 },
{ owner: 'Jeff', title: 'Jeff', value: 5 },
{ owner: 'Sam', title: 'Sam', value: 40 },
{ owner: 'Sundar', title: 'Sundar', value: 50 },
{ owner: 'Jack', title: 'Jack', value: 5 }
]);

console.log('DB created');
process.exit(0);
} 
catch (err) 
{
console.error(err);
process.exit(1);
}
})();
//#endregion