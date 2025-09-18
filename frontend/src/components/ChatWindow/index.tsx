import { Paper } from "@mui/material";
import MessageList from "../MessageList";
import MessageInput from "../MessageInput";
import { useAppSelector } from "../../redux/hook";

export default function ChatWindow() {
    const { activeId} = useAppSelector((state) => state.conversation);
  console.log("ChatWindow conversationId:", activeId);
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
