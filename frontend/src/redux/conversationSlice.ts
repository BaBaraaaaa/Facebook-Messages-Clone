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
// Lấy tất cả cuộc trò chuyện theo userId
export const fetchConversations = createAsyncThunk<IConversation[], string>(
  "conversation/fetchConversations",
  async (userId) => {
    const { data } = await conversationService.getByUserId(userId);
    // Đảm bảo trả về IConversation[]
    return Array.isArray(data) ? data : [data];
  }
);
// Đánh dấu cuộc trò chuyện đã đọc
export const markAsRead = createAsyncThunk(
  "conversation/markAsRead",
  async (conversationId: string) => {
    const { data } = await conversationService.markAsRead(conversationId);
    return data;
  }
);
// Tạo cuộc trò chuyện mới
export const createConversation = createAsyncThunk<
  IConversation,
  { name?: string; memberEmails: string[] }
>("conversation/create", async (payload) => {
  const { data } = await conversationService.create({ members: payload.memberEmails });
  return data;
});

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
    builder.addCase(markAsRead.fulfilled, (state, action) => {
      // Reset unreadCounts cho user hiện tại
      const userId = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")!)._id
        : null;
      if (!userId) return;
      const convId = action.meta.arg;
      const conv = state.list.find((c) => c._id === convId);
      if (conv && conv.unreadCounts) {
        conv.unreadCounts[userId] = 0;
      }
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
