import express from 'express';
import { logut } from '../controllers/logutController.js';

const router = express.Router();

router.get('/', logut);

export default router;
