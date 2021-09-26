const express = require('express');
const cors = require('cors');

const PALAVRAS = [
  {
    palavra: 'São Paulo',
    dica: 'Salve o Tricolor Paulista!! Amado clube brasileiro!!',
  },
  {
    palavra: 'Vasco',
    dica: 'Tetra rebaixado',
  },
  {
    palavra: 'Santos',
    dica: 'O time de Pelé',
  },
  {
    palavra: 'Corinthians',
    dica: 'Campeão da Série B de 2008 KKKK',
  },
  {
    palavra: 'Fluminense',
    dica: 'Foi vice-campeão duas vezes para a LDU',
  },
  {
    palavra: 'Flamengo',
    dica: 'É carioca mas se acha europeu',
  },
  {
    palavra: 'Botafogo',
    dica: 'Viúva do Garrincha',
  },
  {
    palavra: 'Palmeiras',
    dica: 'Não tem mundial!! 51 é cachaça!!',
  },
  {
    palavra: 'Cruzeiro',
    dica: 'Fala, Zezé. Bom dia, cara.',
  },
  {
    palavra: 'Atlético Mineiro',
    dica: 'Time que nunca é bi-campeão',
  },
  {
    palavra: 'Internacional',
    dica: 'Coitada da Renata Fan',
  },
  {
    palavra: 'Grêmio',
    dica: 'Imortal que mais morre',
  },
];

const app = express();
app.use(cors());
app.use(express.json());

app.get('/palavra', (_, response) => {
  const random = Math.random();
  const index = Math.floor(random * (PALAVRAS.length - 1));
  response.json(PALAVRAS[index]); 
});

app.listen(3000);
