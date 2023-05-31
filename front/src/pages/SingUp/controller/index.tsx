import { useState } from "react";
import UserService from "../../../services/user";
import { IUser } from "../interfaces";

function getErrorMessage(error: any) {
  const status = error?.response?.status;

  switch (status) {
    case 400:
      return "URL inválida, favor tente novamente.";
    case 404:
      return "Nenhum usuário encontrado, favor tente novamente.";
    case 409:
      return "Usuário já registrado, favor tente novamente.";
    default:
      return "Ops! Parece que algo deu errado.";
  }
}

export const useHandleApi = () => {
  const user = {
    name: "",
    cpf: "",
    password: "",
  }

  const [newUser, setNewUser] = useState<IUser>(user);


  const handleCreateUser = async () => {
    try {
      await UserService.createUser({ ...newUser });
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      window.location.reload();
      alert(errorMessage);
    } finally {
      setNewUser(user);
    }
  };

  return {
    handleCreateUser,
    newUser,
    setNewUser,
  };
};
