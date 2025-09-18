import { Box, Avatar, Typography, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function ConversationHeader() {
  return (
    <Box
      sx={{
        p: 2,
        borderBottom: "1px solid #f0f2f5",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
      <Box>
        <Typography fontWeight={600}>Người dùng 1</Typography>
        <Typography variant="body2" color="text.secondary">
          Đang hoạt động
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }} />
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
}
