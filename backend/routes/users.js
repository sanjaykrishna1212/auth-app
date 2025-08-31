const express = require('express');
const router = express.Router();
const { connect } = require('../db');
const bcrypt = require('bcrypt');


async function auth(req, res, next) {
const token = req.headers['x-auth-token'];
if (!token) return res.status(401).json({ error: 'Missing token' });
const db = await connect();
const session = await db.collection('sessions').findOne({ token });
if (!session) return res.status(401).json({ error: 'Invalid token' });
req.session = session;
next();
}


router.get('/me', auth, async (req, res) => {
const db = await connect();
const users = db.collection('users');
const user = await users.findOne(
{ userId: req.session.userId },
{ projection: { passwordHash: 0 } }
);


const records = await db.collection('records').find({ owner: req.session.userId }).toArray();
res.json({ user, records });
});


router.get('/', auth, async (req, res) => {
const db = await connect();
if (req.session.role !== 'Admin') return res.status(403).json({ error: 'Forbidden' });
const users = await db.collection('users').find({}, { projection: { passwordHash: 0 } }).toArray();
res.json(users);
});


router.post('/', auth, async (req, res) => {
const db = await connect();
if (req.session.role !== 'Admin') return res.status(403).json({ error: 'Forbidden' });


const { userId, name, password, role = 'General User' } = req.body;
if (!userId || !password) return res.status(400).json({ error: 'userId and password required' });


const passwordHash = await bcrypt.hash(password, 10);
const users = db.collection('users');
await users.insertOne({ userId, name, passwordHash, role });
res.json({ ok: true });
});


router.delete('/:userId', auth, async (req, res) => {
const db = await connect();
if (req.session.role !== 'Admin') return res.status(403).json({ error: 'Forbidden' });
const users = db.collection('users');
await users.deleteOne({ userId: req.params.userId });
res.json({ ok: true });
});


module.exports = router;