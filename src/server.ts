import express from 'express';
import './database';
import 'reflect-metadata';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('Server rodando na porta 3333');
});
