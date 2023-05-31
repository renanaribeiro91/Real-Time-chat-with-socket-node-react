import userModel from '../model/user-model';
import { IUser } from '../interfaces/user-interface';

export const userRepository = () => {

  const getUsers = async (): Promise<IUser[]> => {
    return userModel.find();
  };

  const findUser = async (cpf: string): Promise<IUser> => {
    return userModel.findOne({ cpf });
  };

  const createUser = async ({ id, name, cpf, password }: IUser): Promise<IUser> => {
    return userModel.create({ id, name, cpf, password });
  };

  const updateUser = async (cpf: string, data: Partial<IUser>): Promise<IUser | null> => {
    return userModel.findOneAndUpdate({ cpf }, data,  { returnOriginal: false },);
  };

  const deleteUser = async (cpf: string): Promise<void> => {
    await userModel.deleteOne({ cpf });
  };

  return {
    getUsers,
    findUser,
    createUser,
    updateUser,
    deleteUser
  };
};
