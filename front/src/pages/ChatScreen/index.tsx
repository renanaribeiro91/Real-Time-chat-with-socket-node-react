import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Chat from '../../components/Chat';
import UserList from '../../components/UserList';
import { RootState } from '../../store';
import SingUp from '../SingUp';
import * as S from './styles';


const ChatScreen: React.FC = () => {
  const chatVisibility = useSelector((state: RootState) => state.chat.chatVisibility);
  const selectedUser = useSelector((state: RootState) => state.chat.selectedUser)
  const [key, setKey] = useState(0);

  const handleUserListUpdate = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="App">
      {!chatVisibility ? (
        <SingUp />
      ) :  (
        <S.Container>
          <S.UserListContainer>
            <UserList key={key} onUpdateSelectedUser={handleUserListUpdate} />
          </S.UserListContainer>
          <S.CenterContainer>
           {selectedUser && <Chat />}
          </S.CenterContainer>
        </S.Container>
      )}
    </div>
  );
};

export default ChatScreen;
