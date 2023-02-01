const logger = (req, _res, next) => {
  console.log('Request received', req.path);
  next();
}

export {
  logger,
}
