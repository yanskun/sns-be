import express from 'express';
import OGPController from '../controllers/ogpController';

const router = express.Router();
router.get('/', OGPController.getOGP);

export default router;
