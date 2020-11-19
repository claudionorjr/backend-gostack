import 'reflect-metadata';
import express from 'express';
import uploadConfig from './config/upload';
import './database';
import routes from './routes';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => {
  console.log('Server rodando na porta 3333');
});
