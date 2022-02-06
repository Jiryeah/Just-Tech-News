const router = require(`express`).Router();

const apiRoutes = require(`./api`);
const homeRoutes = require(`./home-routes`);
const dashboardRoutes = require(`./dashboard-routes`);

//* Collects packaged API endpoints and prefixes them with '/api'.
router.use(`/api`, apiRoutes);
router.use(`/`, homeRoutes);
router.use(`/dashboard`, dashboardRoutes);

//* If request is made to an endpoint that does not exist, a 404 error will be received.
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
