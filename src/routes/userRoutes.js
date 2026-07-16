import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import { updateUserAvatar } from '../controllers/userController.js';
import { getCurrentUser } from '../controllers/userController.js';
import { updateCurrentUser } from '../controllers/userController.js';
const userRouter = Router();
userRouter.get('/users/me', authenticate, getCurrentUser);
userRouter.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);
userRouter.patch('/users/me', authenticate, updateCurrentUser);
export default userRouter;
