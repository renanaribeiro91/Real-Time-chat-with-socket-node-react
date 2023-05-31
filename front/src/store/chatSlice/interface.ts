import { Socket } from 'socket.io-client';

export interface IUserList {
  id?: string;
  username?: string;
}

export interface ChatState {
  chatVisibility: boolean;
  selectedUser: IUserList | null;
  userList: IUserList[];
  socket: Socket | null;
}
