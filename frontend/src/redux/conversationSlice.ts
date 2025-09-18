import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IConversation } from "../types/conversation";
import { conversationService } from "../services/conversationService";

interface ConversationState {
  list: IConversation[];
  activeId: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: ConversationState = {
  list: [],
  activeId: null,
  status: "idle",
  error: undefined,
};
export const fetchConversations = createAsyncThunk(
  "conversation/fetchAll",
  async () => {
    const { data } = await conversationService.getAll();
    return data;
  }
);

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<IConversation[]>) => {
      state.list = action.payload;
    },
    addConversation: (state, action: PayloadAction<IConversation>) => {
      state.list.push(action.payload);
    },
    updateConversation: (state, action: PayloadAction<IConversation>) => {
      const idx = state.list.findIndex((c) => c._id === action.payload._id);
      if (idx !== -1) {
        state.list[idx] = action.payload;
      }
    },
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchConversations.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
    });
    builder.addCase(fetchConversations.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const {
  setConversations,
  addConversation,
  updateConversation,
  setActiveConversation,
} = conversationSlice.actions;
export default conversationSlice.reducer;
