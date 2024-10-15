const express = require('express');
const router = express.Router();
const storesController = require('../controller/storesController');

router.post('/nearest-store', storesController.findNearestStore);
// router.get('/storeDetails', storesController.getStoreDetails);

module.exports = router;