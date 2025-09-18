import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IMessage } from "../types/message"

interface MessageState {
  byConversation: Record<string, IMessage[]>; // {conversationId: messages[]}
}

const initialState: MessageState = {
  byConversation: {},
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (
      state,
      action: PayloadAction<{ conversationId: string; messages: IMessage[] }>
    ) => {
      const { conversationId, messages } = action.payload;
      state.byConversation[conversationId] = messages;
    },
    addMessage: (
      state,
      action: PayloadAction<{ conversationId: string; message: IMessage }>
    ) => {
      const { conversationId, message } = action.payload;
      if (!state.byConversation[conversationId]) state.byConversation[conversationId] = [];
      state.byConversation[conversationId].push(message);
    },
  },
});

export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
