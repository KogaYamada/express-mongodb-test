import express from 'express';
import usersController from '../controllers/usersController';

const router = express.Router();

router.get('/:username', userController.show);
router.post('/', usersController.create);

export default router;
