import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as S from './styles';
import { format } from 'date-fns';
import foto from '../../assets/pictures/chat-interno-para-empresas.jpg'

const Chat: React.FC = () => {
  const socket = useSelector((state: any) => state.chat.socket);
  const selectedUser = useSelector((state: any) => state.chat.selectedUser);

  const [messages, setMessages] = useState<any[]>([]);
  const messageRef = useRef<HTMLInputElement>(null);
  const isCurrentUserRef = useRef(false);

  useEffect(() => {
    if (socket) {
      socket.on('receive_message', (message: any) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      socket.on('message', (message: any) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off('receive_message');
        socket.off('message');
      }
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (messageRef.current) {
      const messageText = messageRef.current.value.trim();

      if (messageText !== '') {
        const message: any = {
          author: selectedUser?.username,
          text: messageText,
          timestamp: format(new Date(), 'dd/MM/yyyy HH:mm'),
        };

        if (socket) {
          socket.emit('message', message);
        }

        messageRef.current.value = '';
      }
    }
  };

  return (
    <S.OuterContainer>
      <S.InnerContainer>
        <S.ChatContainer>1
          <S.ChatHeader>{selectedUser?.username}</S.ChatHeader>
          <S.ChatMessages backgroundImage={foto}>
            {messages.map((message) => (
              <S.Message
                key={message.timestamp}
                isCurrentUser={message.author === selectedUser?.username}
              >
                {message.author === selectedUser?.username ? (
                  <>
                    <S.MessageAuthor>{message.author}</S.MessageAuthor>
                    <S.MessageText>{message.text}</S.MessageText>
                    <S.MessageTimestamp>{message.timestamp}</S.MessageTimestamp>
                  </>
                ) : (
                  <>
                    <S.OtherUserAuthor>{message.author}</S.OtherUserAuthor>
                    <S.OtherUserText>{message.text}</S.OtherUserText>
                    <S.OtherUserTimestamp>{message.timestamp}</S.OtherUserTimestamp>
                  </>
                )}
              </S.Message>
            ))}
          </S.ChatMessages>
          <S.ChatInputContainer>
            <S.ChatInput ref={messageRef} />
            <S.SendButton onClick={handleSendMessage}>Send</S.SendButton>
          </S.ChatInputContainer>
          {isCurrentUserRef.current && (
            <S.CurrentUserTyping>Typing...</S.CurrentUserTyping>
          )}
        </S.ChatContainer>
      </S.InnerContainer>
    </S.OuterContainer>
  );
};

export default Chat;
