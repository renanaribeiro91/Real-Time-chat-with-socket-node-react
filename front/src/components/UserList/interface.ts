export interface IUserList {
  id: string;
  username?: string;
}

export interface UserListProps {
  onUpdateSelectedUser: () => void;
}
