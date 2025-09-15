const router = require('express').Router();

router.use('/slr', require('./slr.routes'));          // /api/slr/...
router.use('/favorites', require('./favorites.routes'));

module.exports = router;
