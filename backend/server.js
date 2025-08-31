const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyParser.json());


// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => res.send({ ok: true }));
app.listen(port, () => console.log(`Server listening on ${port}`));