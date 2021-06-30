import express from 'express';
import OGPController from '../controllers/ogpController';
import TrendController from '../controllers/trendController';
import tagController from '../controllers/tagController';

const router = express.Router();
router.get('/ogp', OGPController.getOGP);
router.get('/trends', TrendController.getTrends);
router.get('/tags', tagController.getTags);
router.post('/trends', TrendController.postTrend);

export default router;
