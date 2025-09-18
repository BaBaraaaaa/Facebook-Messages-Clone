import { Paper } from "@mui/material";
import MessageList from "../MessageList";
import MessageInput from "../MessageInput";

export default function ChatWindow() {
  return (
    <Paper
      elevation={3}
      sx={{
        flex: 1,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
        height: "100%",
        minWidth: 0,
      }}
    >
      <MessageList />
      <MessageInput />
    </Paper>
  );
}
