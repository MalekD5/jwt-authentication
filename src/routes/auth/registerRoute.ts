import express from 'express';
import { registerController } from '../../controllers/auth/registerController';
import { validationMiddleware } from '../../middleware/validationMiddleware';
import { body } from 'express-validator';
import { ENV } from '../../app';

const router = express.Router();
router.post(
  '/register',
  [
    body('username').not().isEmpty().trim().escape(),
    body('email').isEmail(),
    ENV === 'development'
      ? body('password')
      : body('password').isStrongPassword()
  ],
  validationMiddleware,
  registerController
);

export default router;
