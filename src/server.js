require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');

const router = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

app.use((err, req, res) => {
  return res.status(500).json({
    status: 'Error',
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Servidor executando na porta ${process.env.PORT}`);
});

module.exports = app;
