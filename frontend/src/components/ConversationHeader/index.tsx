import { Box, Avatar, Typography, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAppSelector } from "../../redux/hook";

export default function ConversationHeader({
  conversationId,
}: {
  conversationId: string | null;
}) {
  const conversation = useAppSelector((state) =>
    state.conversation.list.find((c) => c._id === conversationId)
  );

  // Nếu là nhóm hay chat 1-1, lấy tên & avatar phù hợp
  const user = useAppSelector((state) => state.auth.user);
  const isGroup = conversation?.isGroup;
  const otherUser = !isGroup
    ? conversation?.members.find((m) => m._id !== user?._id)
    : undefined;

  const displayName = isGroup
    ? conversation?.name || "Nhóm"
    : otherUser?.name || "Người dùng";
  const displayAvatar = otherUser?.avatarUrl;

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
      <Avatar src={displayAvatar} />
      <Box>
        <Typography fontWeight={600}>{displayName}</Typography>
        <Typography variant="body2" color="text.secondary">
          {otherUser?.online || "Đang hoạt động"}
        </Typography>
      </Box>
      <Box sx={{ flex: 1 }} />
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Box>
  );
}
