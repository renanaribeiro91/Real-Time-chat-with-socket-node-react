import styled from 'styled-components';

export const UserListContainer = styled.div<{ showUserList: boolean }>`
  margin-top: 10px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  width: ${({ showUserList }) => (showUserList ? '250px' : '20px')};
  height: 100vh;
  background-color: #f5f5f5;
  border-right: 1px solid #ccc;
  transition: width 0.3s ease;
  overflow-y: auto;
`;

export const UserItem = styled.div<{ selected: boolean }>`
  color: green;
  margin-bottom: 5px;
  cursor: pointer;
  padding: 5px;
  background-color: ${({ selected }) => (selected ? '#ccc' : 'transparent')};
`;

export const ToggleButton = styled.button`
  align-self: flex-end;
  margin-top: 10px;
  padding: 5px;
  background-color: #f5f5f5;
  border: none;
  cursor: pointer;
`;
