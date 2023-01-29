const { Pool } = require('pg')
const format = require('pg-format')

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "postgres",
  database: "joyas",
  port: 5432,
  allowExitOnIdle: true
});

const getJewels = async ({ limits = 10, order_by = "id_ASC", page = 1 }) => {
  const [campo, direccion] = order_by.split("_");
  const offset = (page - 1) * limits; 
  const formattedQuery = format('SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s',
    campo, direccion, limits, offset)
  pool.query(formattedQuery)
  const { rows: inventario } = await pool.query(formattedQuery)
  return inventario
}

const getFilterJewels = async ({precio_max, precio_min, categoria, metal}) => {
  let filtros = []
  const values = []
  const addFilter = (campo, comparador, valor) => {
    values.push(valor)
    const { length } = filtros
    filtros.push(`${campo} ${comparador} $${length + 1}`)
  }
  if (precio_max) addFilter('precio', '<=', precio_max)
  if (precio_min) addFilter('precio', '>=', precio_min)
  if (categoria) addFilter('categoria', '=', categoria)
  if (metal) addFilter('metal', '=' , metal)

  let consulta = 'SELECT * FROM inventario'

  if (filtros.length > 0) {
    filtros = filtros.join(" AND ")
    consulta += ` WHERE ${filtros}`
  }

  const { rows: inventario } = await pool.query(consulta, values)
  return inventario
}


const HATEOAS = (inventario) => {
  const results = inventario.map((m) => {
    return {
      name: m.nombre,
      href: `/joyas/joya/${m.id}`,
    }
  }).slice(0, 6)
  const total = inventario.length
  const HATEOAS = {
    total,
    results
  }
  return HATEOAS
}


module.exports = {getJewels, getFilterJewels, HATEOAS}