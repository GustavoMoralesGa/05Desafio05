import {
  getJewels,
  hateoas,
  getFilterJewels,
} from './consultas.js'

import { Router } from "express"

const router = new Router();

const joyasIndexHandler = async (req, res, next) => {
  try {
    const queryStrings = req.query
    const joyas = await getJewels(queryStrings)
    const getHATEOAS = await hateoas(joyas)
    res.json(getHATEOAS);
  } catch (err) {
    next(err)
  }
}

const joyasFilterHandler = async (req, res, next) => {
  try {
  const queryStrings = req.query
  const joyas = await getFilterJewels(queryStrings)
  res.json(joyas)
  } catch (err) {
    next(err)
  }
}

router.get('/', joyasIndexHandler)
router.get('/filtros', joyasFilterHandler);

export default router
