
import { Box, InputBase, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function MessageInput() {
  return (
    <Box
      sx={{
        p: 2,
        borderTop: "1px solid #f0f2f5",
        display: "flex",
        alignItems: "center",
        gap: 1,
        bgcolor: "#fff",
      }}
    >
      <InputBase
        sx={{ flex: 1, bgcolor: "#f5f6fa", borderRadius: 2, px: 2, py: 1 }}
        placeholder="Nhập tin nhắn..."
        inputProps={{ "aria-label": "message" }}
      />
      <IconButton color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
}
