import { Box, Paper, Typography, Stack } from "@mui/material";

export default function MessageList() {
  return (
    <Box sx={{ flex: 1, p: 2, overflowY: "auto", bgcolor: "#f7f9fb" }}>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Paper sx={{ p: 1.5, borderRadius: 2, bgcolor: "#e4e6eb", maxWidth: 320 }}>
            <Typography>Xin chào! Đây là tin nhắn mẫu.</Typography>
          </Paper>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Paper sx={{ p: 1.5, borderRadius: 2, bgcolor: "primary.main", color: "#fff", maxWidth: 320 }}>
            <Typography>Chào bạn! Đây là phản hồi.</Typography>
          </Paper>
        </Box>
      </Stack>
    </Box>
  );
}
