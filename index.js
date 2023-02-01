import express from 'express';
import apiJoyas from './src/apiJoyas.js';
import { logger } from './src/middleware.js';

const app = express();
const port = 3000;

app.use(logger)

app.use('/joyas', apiJoyas);

app.use((err, _req, res, _next) => {
  console.log('Error In App', err);
  const errorResponse = {
    err,
    msg: 'Oops, application failed'
  };
  res.status(500).send(errorResponse)
})

app.get('*', (_req, res) => {
  res.status(404).send("Lo siento, esta ruta no existe (ni en otro multiverso)")
})

app.listen(port, console.log(`Servidor iniciado en puerto ${port}`))