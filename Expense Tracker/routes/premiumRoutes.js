const express = require('express');
const router = express.Router();
const premiumController = require('../controllers/premiumController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/premium/showleaderboard', authMiddleware, premiumController.showLeaderboard);
router.get('/premium/report', authMiddleware, premiumController.filteredReport);
router.get('/premium/download', authMiddleware, premiumController.downloadReport);

module.exports = router;
