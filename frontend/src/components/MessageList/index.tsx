import { Box, Paper, Typography, Stack, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useEffect } from "react";
import { fetchMessages } from "../../redux/messageSlice";

export default function MessageList() {
  const { activeId } = useAppSelector((state) => state.conversation);
  console.log("MessageList conversationId:", activeId);
  const { list: messages, status } = useAppSelector((state) => state.message);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (activeId) {
      dispatch(fetchMessages(activeId));
    }
  }, [dispatch, activeId]);
  if (!activeId) {
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Hãy chọn một cuộc trò chuyện</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ flex: 1, p: 2, overflowY: "auto", bgcolor: "#f7f9fb" }}>
      {status === "loading" && <CircularProgress size={24} />}
      <Stack spacing={2}>
        {messages.map((msg) => {
          const isMine = msg.sender?._id === user?._id;
          return (
            <Box
              key={msg._id}
              sx={{
                display: "flex",
                justifyContent: isMine ? "flex-end" : "flex-start",
              }}
            >
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  maxWidth: 320,
                  bgcolor: isMine ? "primary.main" : "#e4e6eb",
                  color: isMine ? "#fff" : "inherit",
                }}
              >
                <Typography>{msg.text}</Typography>
              </Paper>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
