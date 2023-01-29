const express = require('express');
const { getJewels, HATEOAS, getFilterJewels } = require('./consultas');
const app = express();
const port = 3000;

app.listen(port, console.log(`Servidor iniciado en puerto ${port}`))

app.get('/joyas', async (req, res) => {
  try {
  const queryStrings = req.query
  const joyas = await getJewels(queryStrings)
  const getHATEOAS = await HATEOAS(joyas)
  res.json(getHATEOAS);
  } catch (err) {
    res.status(500).send(err)
  }
})

// FALTA MANEJAR MIDLEWARE Y TRY CATCH

app.get('/joyas/filtros', async (req, res) => {
  const queryStrings = req.query
  const joyas = await getFilterJewels(queryStrings)
  res.json(joyas)
})  

app.get('*', (req, res) => {
  res.status(404).send("Lo siento, esta ruta no existe (ni en otro multiverso)")
})