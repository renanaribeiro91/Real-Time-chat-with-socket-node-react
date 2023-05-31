import styled, { css } from 'styled-components';

export const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const InnerContainer = styled.div`
  height: 800px;
  width: 600px;
  background-color: #fff;
  box-shadow: 5px 5px 15px 5px rgba(0, 0, 0, 0.3);
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChatHeader = styled.div`
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
  background-color: green
`;


export const ChatMessages = styled.div<{backgroundImage? :string,backgroundColor?:string}>`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background: ${(props) =>
    props?.backgroundImage ? `url(${props.backgroundImage})` : props?.backgroundColor || 'none'};
  background-size: cover;
  background-position: center;
`;


export const Message = styled.div<{ isCurrentUser?: boolean }>`
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-self: ${({ isCurrentUser }) => (isCurrentUser ? 'flex-end' : 'flex-start')};

  & > * {
    align-self: ${({ isCurrentUser }) => (isCurrentUser ? 'flex-end' : 'flex-start')};
    background-color: ${({ isCurrentUser }) => (isCurrentUser ? 'transmparent' : 'transmparent')};
  }
`;


export const OtherUserAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
  color:white;
  font-size: 20px;
  background-color:gray;
`;

export const OtherUserText = styled.div`
  margin-bottom: 4px;
  font-weight: 900;
  font-size: 15px;
  color:black;
`;

export const OtherUserTimestamp = styled.div`
  font-size: 9px;
  color: #888888;
`;

export const MessageAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 4px;
  color:blue;
  font-size: 20px;
  background-color:white;
`;

export const MessageText = styled.div`
  font-weight: 900;
  margin-bottom: 4px;
  font-size: 15px;
  color:black;
`;

export const MessageTimestamp = styled.div`
  font-size: 9px;
  color: #888888;
`;

export const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: #f0f0f0;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  margin-right: 8px;
`;

export const CurrentUserTyping = styled.div`
  font-size:20px
`;

export const SendButton = styled.button`
  padding: 8px 16px;
  background-color: #4285f4;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
