import express from 'express';
import OGPController from '../controllers/ogpController';

const router = express.Router();
router.get('/ogp', OGPController.getOGP);

export default router;
