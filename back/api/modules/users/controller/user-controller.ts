import { NextFunction, Request, Response } from 'express';
import { userService } from '../services/user-service';

const { create, getAllUser, update, removeUser } = userService();

export const userController = () => {

  const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await create(req.body);
      if (user) return res.status(201).send({ ok: 'ok', user });
      res.status(409).send({message:'Usuário ja existe'});
      next();
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await getAllUser();
      res.status(200).send({ ok: 'ok', users });
      next();
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await update(req.body);
      if (user) return res.status(200).send({ ok: 'ok', user });
      res.status(404).send({message:'Usuário não encontrado'});
      next();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await removeUser(req.body);
      if (user) return res.status(202)
      res.status(404).send({message:'Usuário não encontrado'});
      next();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createUser,
    updateUser,
    getUsers,
    deleteUser
  };
};
