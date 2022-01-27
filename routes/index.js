const router = require('express').Router();

const apiRoutes = require('./api');

//* Collects packaged API endpoints and prefixes them with '/api'.
router.use('/api', apiRoutes);

//* If request is made to an endpoint that does not exist, a 404 error will be received.
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;