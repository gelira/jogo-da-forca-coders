const express = require('express');
const cors = require('cors');

let PALAVRAS = require('./model.json');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/palavra', (_, response) => {
  const random = Math.random();
  const index = Math.floor(random * (PALAVRAS.length - 1));
  response.json(PALAVRAS[index]); 
});

app.listen(3000);
