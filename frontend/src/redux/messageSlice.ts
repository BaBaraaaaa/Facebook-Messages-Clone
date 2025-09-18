import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { type IMessage } from "../types/message";
import { messageService } from "../services/messageService";

interface MessageState {
  list: IMessage[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: MessageState = {
  list: [],
  status: "idle",
};

export const fetchMessages = createAsyncThunk(
  "message/fetchByConversation",
  async (conversationId: string) => {
    const { data } = await messageService.getMessages(conversationId);
    return data as IMessage[];
  }
);
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.list.push(action.payload);
    },
    clearMessages: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;
