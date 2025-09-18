import { Paper, Box, IconButton, InputBase, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatList from "../ChatList";

export default function Sidebar() {
  return (
    <Paper
      elevation={3}
      sx={{
        width: 320,
        minWidth: 240,
        maxWidth: 360,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
        height: "100%",
      }}
    >
      <Box sx={{ p: 2, pb: 1 }}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: 2,
            boxShadow: 0,
            bgcolor: "#f5f6fa",
          }}
        >
          <IconButton sx={{ p: "8px" }}>
            <SearchIcon />
          </IconButton>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Tìm kiếm cuộc trò chuyện" />
        </Paper>
      </Box>
      <Divider />
      <ChatList />
    </Paper>
  );
}
