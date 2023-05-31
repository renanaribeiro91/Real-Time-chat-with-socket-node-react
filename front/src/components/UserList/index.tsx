
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChevronRight, ChevronLeft } from '@mui/icons-material';
import { setSelectedUser, updateUserList } from '../../store/chatSlice/chatSlice';
import * as S from './styles';
import { IUserList, UserListProps } from './interface';


export default function UserList({onUpdateSelectedUser}:UserListProps) {
  const socket = useSelector((state: any) => state.chat.socket);
  const selectedUser = useSelector((state: any) => state.chat.selectedUser);
  const dispatch = useDispatch();

  const [showUserList, setShowUserList] = useState<boolean>(true);
  const userListRef = useRef<HTMLDivElement>(null);

  const handleClickUser = (user: IUserList) => {
    dispatch(setSelectedUser(user));
    onUpdateSelectedUser()
  };

  const toggleUserList = () => {
    setShowUserList(!showUserList);
  };

  useEffect(() => {
    const handleUpdateUserList = (users: IUserList[]) => {
      dispatch(updateUserList(users));
    };

    if (socket) {
      socket.on('user_list', handleUpdateUserList);

      return () => {
        socket.off('user_list', handleUpdateUserList);
      };
    }
  }, [socket, dispatch]);

  useEffect(() => {
    if (userListRef.current) {
      userListRef.current.scrollTop = userListRef.current.scrollHeight;
    }
  }, []);

  const userList = useSelector((state: any) => state.chat.userList);

  return (
    <S.UserListContainer showUserList={showUserList} ref={userListRef}>
      <strong style={{ color: 'black' ,marginTop: '20px'}}>{showUserList && 'Usuários Online:'}</strong>
      <S.ToggleButton onClick={toggleUserList}>
        {showUserList ? <ChevronLeft /> : <ChevronRight />}
      </S.ToggleButton>
      {userList.map((user: IUserList) =>
        user.id !== socket?.id && showUserList ? (
          <S.UserItem
            key={user.id}
            onClick={() => handleClickUser(user)}
            selected={selectedUser?.id === user.id}
          >
            {user.username}
          </S.UserItem>
        ) : null
      )}

    </S.UserListContainer>
  );
}
