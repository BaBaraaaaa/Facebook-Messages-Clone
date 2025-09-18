import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from "@mui/material";

export default function ChatList() {
  return (
    <List sx={{ flex: 1, overflowY: "auto", p: 0 }}>
      {[1, 2, 3].map((item) => (
        <ListItem
          key={item}
          sx={{
            borderRadius: 2,
            mx: 1,
            my: 0.5,
            "&:hover": { bgcolor: "#f0f2f5" },
            cursor: "pointer",
          }}
        >
          <ListItemAvatar>
            <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={<Typography fontWeight={600}>Người dùng {item}</Typography>}
            secondary={<Typography variant="body2" color="text.secondary">Tin nhắn gần nhất...</Typography>}
          />
        </ListItem>
      ))}
    </List>
  );
}
