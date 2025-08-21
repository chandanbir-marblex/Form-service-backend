import { Router } from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from '../controllers/user.controller';
import { verifyJWT } from '../middlewares/auth.middleware';

const router = Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// secured routes
router.route('/logout').post(verifyJWT, logoutUser);
router.route('/current-user').get(verifyJWT, getCurrentUser);

export default router;