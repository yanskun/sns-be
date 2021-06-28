import express from 'express';
import OGPController from '../controllers/ogpController';
import TrendController from '../controllers/trendController';

const router = express.Router();
router.get('/ogp', OGPController.getOGP);
router.get('/trends', TrendController.getTrends);

export default router;
