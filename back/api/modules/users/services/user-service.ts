import { IUser } from '../interfaces/user-interface';
import { userRepository } from '../repository/user-repository';
import { v4 as uuidv4 } from 'uuid';

const { createUser, getUsers, findUser, deleteUser, updateUser } = userRepository();

export const userService = () => {
  const create = async ({ name, cpf, password }: IUser) => {
    try {
      const existUser = await findUser(cpf);
      if (existUser) {
        return null;
      }

      const userObj = {
        id: uuidv4(),
        name,
        cpf,
        password,
      };

      const user = await createUser(userObj);

      return user;
    } catch (error) {
      return error;
    }
  };

  const getAllUser = async () => {
    try {
      const existUser = await getUsers();

      return existUser;
    } catch (error) {
      return error;
    }
  };

  const getUser = async ({ cpf }: IUser) => {
    try {
      const existUser = await findUser(cpf);
      if (existUser) {
        return null;
      }

      return existUser;
    } catch (error) {
      return error;
    }
  };

  const update = async ({ name, cpf, password }: IUser) => {
    try {
      const existUser = await findUser(cpf);
      if (existUser) {
        return null;
      }

      const userObj = {
        name,
        cpf,
        password,
      };

      const user = await updateUser(existUser.cpf, userObj);

      return user;
    } catch (error) {
      return error;
    }
  };

  const removeUser = async ({ name, cpf, password }: IUser) => {
    try {
      const existUser = await findUser(cpf);
      if (existUser) {
        return null;
      }

      return deleteUser(existUser.name);
    } catch (error) {
      return error;
    }
  };

  return {
    create,
    getAllUser,
    getUser,
    update,
    removeUser,
  };
};
