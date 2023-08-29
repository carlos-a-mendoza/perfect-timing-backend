require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080
const cors = require('cors');

app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));

app.use(express.json())

const eventRoutes = require('./routes/events');
const userRoutes = require('./routes/users');

app.use('/', eventRoutes);
app.use('/users', userRoutes);



app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});