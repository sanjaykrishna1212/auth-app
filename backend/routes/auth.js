////////////////////////////////////////////////////////////////////////////////////////////
// Purpose: Helps to authenticate the user 
//
// Author: Sanjay
////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { connect } = require('../db');

//#region  auth
router.post('/login', async (req, res) => {
const { userId, password } = req.body;
const delay = parseInt(req.query.delay) || 0;

if (delay) await new Promise(r => setTimeout(r, delay));

const db = await connect();
const users = db.collection('users');
const user = await users.findOne({ userId });

if (!user) return res.status(401).json({ error: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.passwordHash);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

const token = uuidv4();
const sessions = db.collection('sessions');
await sessions.updateOne(
{ token },
{ $set: { token, userId: user.userId, role: user.role, createdAt: new Date() } },
{ upsert: true }
);
res.json({ token, user: { userId: user.userId, name: user.name, role: user.role } });
});

module.exports = router;

//#endregion