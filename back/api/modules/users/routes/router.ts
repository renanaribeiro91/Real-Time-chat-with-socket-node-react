import { Router } from 'express';
import { userController } from '../controller/user-controller';

const { createUser, updateUser, getUsers, deleteUser } = userController();

const router = Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);

export { router };
