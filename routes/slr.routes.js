const router = require('express').Router();
const c = require('../controllers/slrApiController');

router.get('/slimes', c.slimesList);
router.get('/slimes/:id', c.slimeDetail);

router.get('/foods', c.foodsList);
router.get('/foods/:id', c.foodDetail);

router.get('/locations', c.locationsList);
router.get('/locations/:id', c.locationDetail);

router.get('/toys', c.toysList);
router.get('/toys/:id', c.toyDetail);

module.exports = router;
