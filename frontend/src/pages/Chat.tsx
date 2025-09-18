
import { Box, Typography, Avatar, IconButton, InputBase, Paper, Divider, List, ListItem, ListItemAvatar, ListItemText, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';

export default function Chat() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: '#f0f2f5',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          bgcolor: 'primary.main',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700} letterSpacing={1}>
          Facebook Messages Clone
        </Typography>
        <IconButton sx={{ color: '#fff' }}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          gap: 2,
          p: 2,
          overflow: 'hidden',
        }}
      >
        {/* Sidebar - Chat list */}
        <Paper
          elevation={3}
          sx={{
            width: 320,
            minWidth: 240,
            maxWidth: 360,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#fff',
            height: '100%',
          }}
        >
          {/* Search bar */}
          <Box sx={{ p: 2, pb: 1 }}>
            <Paper
              component="form"
              sx={{ display: 'flex', alignItems: 'center', borderRadius: 2, boxShadow: 0, bgcolor: '#f5f6fa' }}
            >
              <IconButton sx={{ p: '8px' }}>
                <SearchIcon />
              </IconButton>
              <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Tìm kiếm cuộc trò chuyện" inputProps={{ 'aria-label': 'search' }} />
            </Paper>
          </Box>
          <Divider />
          {/* Chat list placeholder */}
          <List sx={{ flex: 1, overflowY: 'auto', p: 0 }}>
            {[1, 2, 3].map((item) => (
              <ListItem
                key={item}
                sx={{ borderRadius: 2, mx: 1, my: 0.5, '&:hover': { bgcolor: '#f0f2f5' }, cursor: 'pointer' }}
                component="div"
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
        </Paper>

        {/* Chat area */}
        <Paper
          elevation={3}
          sx={{
            flex: 1,
            borderRadius: 3,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#fff',
            height: '100%',
            minWidth: 0,
          }}
        >
          {/* Conversation header */}
          <Box sx={{ p: 2, borderBottom: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src="https://randomuser.me/api/portraits/men/1.jpg" />
            <Box>
              <Typography fontWeight={600}>Người dùng 1</Typography>
              <Typography variant="body2" color="text.secondary">Đang hoạt động</Typography>
            </Box>
            <Box sx={{ flex: 1 }} />
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Box>
          {/* Message list placeholder */}
          <Box sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: '#f7f9fb' }}>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Paper sx={{ p: 1.5, borderRadius: 2, bgcolor: '#e4e6eb', maxWidth: 320 }}>
                  <Typography>Xin chào! Đây là tin nhắn mẫu.</Typography>
                </Paper>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Paper sx={{ p: 1.5, borderRadius: 2, bgcolor: 'primary.main', color: '#fff', maxWidth: 320 }}>
                  <Typography>Chào bạn! Đây là phản hồi.</Typography>
                </Paper>
              </Box>
            </Stack>
          </Box>
          {/* Message input */}
          <Box sx={{ p: 2, borderTop: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', gap: 1 }}>
            <InputBase
              sx={{ flex: 1, bgcolor: '#f5f6fa', borderRadius: 2, px: 2, py: 1 }}
              placeholder="Nhập tin nhắn..."
              inputProps={{ 'aria-label': 'message' }}
            />
            <IconButton color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
