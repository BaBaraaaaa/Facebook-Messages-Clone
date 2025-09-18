import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  createConversation,
  markAsRead,
  setActiveConversation,
} from "../../redux/conversationSlice";
import { useEffect } from "react";
import { fetchConversations } from "../../redux/conversationSlice";
import type { IConversation } from "../../types/conversation";
export default function ChatList() {
  const dispatch = useAppDispatch();
  const { list, activeId } = useAppSelector((state) => state.conversation);
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);
  // Lấy conversations theo userId
  useEffect(() => {
    setLoading(true);
    if (user?._id) {
      dispatch(fetchConversations(user._id))
        .unwrap()
        .finally(() => setLoading(false));
    }
  }, [user?._id, dispatch]);

  const [openDialog, setOpenDialog] = useState(false);
  const [friendValue, setFriendValue] = useState("");
  console.log(list);
  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setOpenDialog(false);
    setFriendValue("");
  };
  const handleFriendChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFriendValue(e.target.value);
  const handleAddFriend = () => {
    if (!friendValue.trim()) return;
    // Gửi đi email thay vì ID
    if (!user) return;
    dispatch(createConversation({ memberEmails: [friendValue.trim()] }))
      .unwrap()
      .then(() => {
        handleDialogClose();
        setFriendValue(""); // Xóa input sau khi thành công
      })
      .catch((error: Error) => {
        console.error("Failed to create conversation:", error);
        // TODO: Hiển thị lỗi cho người dùng (ví dụ: email không tồn tại)
      });
  };

  const handleConversationClick = (conversation: IConversation) => {
    // Xử lý khi người dùng click vào cuộc trò chuyện
    dispatch(setActiveConversation(conversation._id));
    console.log("Clicked conversation:", conversation);
    dispatch(markAsRead(conversation._id));
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          px: 2,
          pt: 2,
          pb: 1,
        }}
      >
        <Tooltip title="Thêm bạn để trò chuyện">
          <IconButton
            color="primary"
            onClick={handleDialogOpen}
            sx={{
              bgcolor: "#f5f6fa",
              borderRadius: 2,
              boxShadow: 1,
              "&:hover": { bgcolor: "#e3eafc" },
            }}
          >
            <PersonAddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <List sx={{ flex: 1, overflowY: "auto", p: 0 }}>
        {list.length === 0 ? (
          <Stack>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ mt: 2 }}
            >
              Không có cuộc trò chuyện nào
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Thêm bạn bè để bắt đầu trò chuyện!
            </Typography>
          </Stack>
        ) : (
          !loading &&
          list.map((item) => {
            const isGroup = item.isGroup;
            const otherUser: import("../../types/user").IUser | undefined =
              !isGroup
                ? item.members.find((m) => m._id !== user?._id)
                : undefined;
            const userId = user?._id || "";
            const unread =
              userId && item.unreadCounts ? item.unreadCounts[userId] || 0 : 0;
            const isActive = item._id === activeId;
            return (
              <ListItem
                disablePadding
                key={item._id}
                sx={{ mx: 1, my: 0.5, borderRadius: 2 }}
              >
                <ListItemButton
                  onClick={() => handleConversationClick(item)}
                  selected={isActive}
                  sx={{
                    borderRadius: 2,
                    bgcolor: isActive ? "primary.100" : undefined,
                    "&.Mui-selected": {
                      bgcolor: "primary.100",
                      "&:hover": { bgcolor: "primary.200" },
                    },
                    alignItems: "flex-start",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={isGroup ? undefined : otherUser?.avatarUrl}>
                      {isGroup
                        ? item.name?.[0] || "G"
                        : otherUser
                        ? otherUser.name?.[0]
                        : "?"}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography fontWeight={600} noWrap>
                        {isGroup ? item.name : otherUser ? otherUser.name : ""}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" noWrap>
                        {item.lastMessage?.text || "Chưa có tin nhắn"}
                      </Typography>
                    }
                  />
                  {unread > 0 && (
                    <Box
                      sx={{
                        ml: 1,
                        minWidth: 24,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor: "primary.main",
                          color: "#fff",
                          borderRadius: "50%",
                          px: 1,
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {unread}
                      </Box>
                    </Box>
                  )}
                </ListItemButton>
              </ListItem>
            );
          })
        )}
      </List>
      {/* Dialog thêm bạn */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="xs"
        fullWidth
        autoFocus
      >
        <DialogTitle>Thêm bạn mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên người dùng hoặc email"
            type="text"
            fullWidth
            value={friendValue}
            onChange={handleFriendChange}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Huỷ</Button>
          <Button
            onClick={handleAddFriend}
            variant="contained"
            disabled={!friendValue.trim()}
          >
            Thêm bạn
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
