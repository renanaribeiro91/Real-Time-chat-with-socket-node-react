import { Socket } from 'socket.io-client';

export interface IUser {
  name: string
  cpf: string;
  password: string;
}

export interface JoinProps {
  setChatVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputRef?: React.RefObject<HTMLInputElement>;
}
