////////////////////////////////////////////////////////////////////////////////////////////
// Purpose: Helps to start the backend
//
// Author: Sanjay
////////////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;
dotenv.config();

//#region  Middleware
app.use(cors());
app.use(bodyParser.json());
//#endregion

//#region Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
//#endregion

//#region  API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => res.send({ ok: true }));
app.listen(port, () => console.log(`Server listening on ${port}`));
//#endregion