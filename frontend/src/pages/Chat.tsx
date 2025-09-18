import { Box, Paper } from "@mui/material";
import ChatHeader from "../components/ChatHeader";
import Sidebar from "../components/Sidebar";
import ConversationHeader from "../components/ConversationHeader";
import ChatWindow from "../components/ChatWindow";

export default function Chat() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#f0f2f5",
      }}
    >
      {/* Header */}
      <ChatHeader />

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          gap: 2,
          p: 2,
          overflow: "hidden",
        }}
      >
        {/* Sidebar - Chat list */}
        <Sidebar />

        {/* Chat area */}
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
          <ConversationHeader />
          <ChatWindow />
        </Paper>
      </Box>
    </Box>
  );
}
