const { connect, client } = require('./db');
const bcrypt = require('bcrypt');


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
{ userId: 'alice', name: 'Alice', passwordHash: userPass, role: 'General User' },
{ userId: 'bob', name: 'Bob', passwordHash: userPass, role: 'General User' }
]);


await records.insertMany([
{ owner: 'alice', title: 'Alice Rec 1', value: 10 },
{ owner: 'alice', title: 'Alice Rec 2', value: 20 },
{ owner: 'bob', title: 'Bob Rec 1', value: 5 }
]);


console.log('Seeded DB');
process.exit(0);
} catch (err) {
console.error(err);
process.exit(1);
}
})();