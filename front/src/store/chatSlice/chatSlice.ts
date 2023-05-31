import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatState, IUserList } from './interface';

const initialState: ChatState = {
  chatVisibility: false,
  selectedUser: null,
  userList: [],
  socket: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatVisibility(state, action: PayloadAction<boolean>) {
      state.chatVisibility = action.payload;
    },
    setSelectedUser(state, action: PayloadAction<IUserList | null>) {
      state.selectedUser = action.payload;
    },
    updateUserList(state, action: PayloadAction<IUserList[]>) {
      state.userList = action.payload;
    },
    setSocket(state, action: PayloadAction<any | null>) {
      state.socket = action.payload;
    },
  },
});

export const { setChatVisibility,setSelectedUser, updateUserList, setSocket } = chatSlice.actions;
export default chatSlice.reducer;
